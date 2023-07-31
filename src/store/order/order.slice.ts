import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import IOrder from '@/types/order.interface';
import IOrderItem from '@/types/order-item.interface';
import ICustomer from '@/types/customer.interface';
import { RootState } from '@/store/store';
import { getSession } from 'next-auth/react';

// Define other types and constants if required

type InitialState = {
  loading: boolean;
  cart: IOrderItem[];
  totalOrder: number;
  error: string;
  quantity: number;
};

const initialState: InitialState = {
  loading: false,
  cart: [],
  totalOrder: 0,
  error: '',
  quantity: 0,
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
    const session: any = await getSession();
    const token = session?.accessToken;
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
      return thunkAPI.rejectWithValue(
        (error as any).message || 'Something went wrong'
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      const searchIndex = state.cart.findIndex(
        (item) => item.productId === action.payload?.id
      );
      let total = 0;
      if (searchIndex >= 0) {
        state.cart[searchIndex].quantity = state.cart[searchIndex].quantity + 1;
      } else {
        action.payload.id &&
          state.cart.push({
            productId: action.payload.id,
            quantity: action.payload.quantity,
            title: action.payload.title,
            price: action.payload.price,
            imageUrl: action.payload.imageUrl,
          });
      }

      state.cart.forEach((item) => {
        total = total + item.quantity * item.price;
      });
      state.quantity = state.cart.length;
      state.totalOrder = total;
    },
    removeItemFromCart: (state, action: PayloadAction<any>) => {
      if (!action.payload) return;
      state.cart = state.cart.filter((item) => {
        if (item.productId === action.payload) {
          state.totalOrder = state.totalOrder - item.quantity * item.price;
          state.quantity = state.quantity - 1;
        }
        return item.productId !== action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    // Place an order
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      placeOrder.fulfilled,
      (state, action: PayloadAction<IOrder>) => {
        state.loading = false;
        state.cart = [];
        state.error = '';
        state.totalOrder = 0;
        state.quantity = 0;
      }
    );
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Something went wrong';
    });
  },
});

export default orderSlice.reducer;
export const { addToCart, removeItemFromCart } = orderSlice.actions;
