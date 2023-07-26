import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import IOrder from '@/types/order.interface';
import IOrderItem from '@/types/order-item.interface';
import ICustomer from '@/types/customer.interface';
import { RootState, store } from '@/store/store';

// Define other types and constants if required

type InitialState = {
  loading: boolean;
  cart: IOrderItem[];
  totalOrder: number;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  cart: [],
  totalOrder: 0,
  error: '',
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

/**
 * Async thunk to place an order with the given customer details.
 * @param customerDetails - The customer details for the order.
 */
export const placeOrder = createAsyncThunk<IOrder, ICustomer>(
  'order/placeOrder',
  async (customerDetails, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const token = state.authSlice.token;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      Host: process.env.HEADERS_HOST,
      Origin: process.env.HEADERS_ORIGIN,
    };

    try {
      const response = await http.post<IOrder>(
        '/orders',
        {
          orderItems: state.orderSlice.cart,
          ...customerDetails,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        { headers }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).message || 'Something went wrong');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IOrderItem>) => {
      const searchIndex = state.cart.findIndex((item) => item.productId === action.payload.productId);
      let total = 0;

      if (searchIndex >= 0) {
        state.cart[searchIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.cart.forEach(item => {
        total += item.quantity;
      });

      state.totalOrder = total;
    }
  },
  extraReducers: builder => {
    // Place an order
    builder.addCase(placeOrder.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      placeOrder.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        state.loading = false;
        state.cart = [];
        state.error = '';
        state.totalOrder = 0;
      }
    );
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
  }
});

export default orderSlice.reducer;
export const { addToCart } = orderSlice.actions;
