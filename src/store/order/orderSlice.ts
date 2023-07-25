import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import ICart from '@/types/cart.interface'
import IOrder from '@/types/order.interface'
import { store } from '@/store/store'
import ICustomer from '@/types/customer.interface'
import IOrderItem from '@/types/order-item.interface'


type InitialState = {
  loading: boolean
  cart: IOrderItem[]
  totalOrder: number
  error: string
}

const initialState: InitialState = {
  loading: false,
  cart: [],
  totalOrder: 0,
  error: ''
}

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})

const state = //store.getState() 
{authSlice: {token: ""}}

const headers = {
  headers: {
    Authorization: `Bearer ${state.authSlice.token}`,
    Accept: "application/json, text/plain, */*",
    Host: process.env.HEADERS_HOST,
    Origin: process.env.HEADERS_ORIGIN,
  }
}

export const placeOrder = createAsyncThunk('order/placeOrder', (customerDetails: ICustomer) => {
  const state = store.getState()
  return http.post<IOrder>(
    '/orders',
    {
      orderItems: state.orderSlice.cart, ...customerDetails, createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    headers
  ).then(response => response.data)
})

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICart>) => {
      const searchIndex = state.cart.findIndex((item) => item.productId === action.payload.id)
      let total = 0

      if (searchIndex >= 0) {
        state.cart[searchIndex].quantity = state.cart[searchIndex].quantity + 1
      } else {
        action.payload.id && state.cart.push({
          productId: action.payload.id,
          quantity: action.payload.quantity,
          title: action.payload.title,
          price: action.payload.price,
          imageUrl: action.payload.imageUrl,
        })
      }

      state.cart.forEach(item => {
        total = total + item.quantity
      })

      state.totalOrder = total
    }
  },
  extraReducers: builder => {
    // Place an order
    builder.addCase(placeOrder.pending, state => {
      state.loading = true
    })
    builder.addCase(
      placeOrder.fulfilled,
      (state) => {
        state.loading = false
        state.cart = []
        state.error = ''
        state.totalOrder = 0
      }
    )
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? 'Something went wrong'
    })
  }
})

export default orderSlice.reducer
export const { addToCart } = orderSlice.actions
