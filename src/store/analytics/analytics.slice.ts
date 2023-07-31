import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ICustomer from '@/types/customer.interface';
import { getSession } from 'next-auth/react';

// Define interfaces for the data used in the slice
interface IOrderItem {
  productId: string;
  quantity: number;
  title: string;
  price: number;
  imageUrl: string;
}

interface IOrders extends ICustomer {
  orderItems: IOrderItem[];
  id: string;
}

interface IAnalyticItem {
  id: string;
  totalQuantity: number;
  sumPrice?: number;
  title: string;
  price: number;
  imageUrl: string;
}

// Define the initial state for the slice
type InitialState = {
  loading: boolean;
  analytics: IAnalyticItem[];
  orders: IOrders[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  analytics: [],
  orders: [],
  error: '',
};

// Create an instance of axios to use for API requests
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

/**
 * Async thunk action to fetch analytics data from the server.
 * @returns The resolved analytic data or an error if the request fails.
 */
export const getAnalytics = createAsyncThunk<IAnalyticItem[], void>(
  'analytic/analytics',
  async (_, thunkAPI) => {
    const session: any = await getSession();
    const token = session?.accessToken;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      Host: process.env.HEADERS_HOST,
      Origin: process.env.HEADERS_ORIGIN,
    };

    try {
      const response = await http.get<IAnalyticItem[]>('/analytics', {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as any).message || 'Something went wrong'
      );
    }
  }
);

/**
 * Async thunk action to fetch orders data from the server.
 * @returns The resolved orders data or an error if the request fails.
 */
export const getOrders = createAsyncThunk<IOrders[], void>(
  'analytic/orders',
  async (_, thunkAPI) => {
    const session: any = await getSession();
    const token = session?.accessToken;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json, text/plain, */*',
      Host: process.env.HEADERS_HOST,
      Origin: process.env.HEADERS_ORIGIN,
    };

    try {
      const response = await http.get<IOrders[]>('/orders', { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        (error as any)?.message || 'Something went wrong'
      );
    }
  }
);

// Create the analyticSlice using createSlice from Redux Toolkit
const analyticSlice = createSlice({
  name: 'analytic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Analytics
    builder.addCase(getAnalytics.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      getAnalytics.fulfilled,
      (state, action: PayloadAction<IAnalyticItem[]>) => {
        state.loading = false;
        state.analytics = action.payload;
        state.error = '';
      }
    );
    builder.addCase(getAnalytics.rejected, (state, action) => {
      state.loading = false;
      state.analytics = [];
      state.error = action.payload
        ? action.payload.toString()
        : 'Something went wrong';
    });

    // Orders
    builder.addCase(getOrders.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      getOrders.fulfilled,
      (state, action: PayloadAction<IOrders[]>) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = '';
      }
    );
    builder.addCase(getOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.payload
        ? action.payload.toString()
        : 'Something went wrong';
    });
  },
});

export default analyticSlice.reducer;
