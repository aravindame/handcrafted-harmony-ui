import { configureStore } from '@reduxjs/toolkit'

import orderSlice from '@/store/order/orderSlice'
import authSlice from '@/store/auth/authSlice'
import analyticSlice from '@/store/analytic/analyticSlice'
import productSlice from '@/store/product/product.slice'

export const store = configureStore({
  reducer: { authSlice, orderSlice, analyticSlice, productSlice },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
