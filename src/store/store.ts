import { configureStore } from '@reduxjs/toolkit';

import orderSlice from '@/store/order/order.slice';
import analyticSlice from '@/store/analytics/analytics.slice';
import productSlice from '@/store/product/product.slice';

/**
 * The Redux store configuration function.
 * It combines multiple slices and creates the Redux store.
 * @returns The configured Redux store.
 */
export const store = configureStore({
  reducer: { orderSlice, analyticSlice, productSlice },
});

/**
 * The root state type inferred from the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * The type representing the dispatch function of the Redux store.
 */
export type AppDispatch = typeof store.dispatch;
