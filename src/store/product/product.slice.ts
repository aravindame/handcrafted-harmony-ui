import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '@/types/product.interface';
import { store } from '@/store/store'


type InitialState = {
  loading: boolean;
  products: IProduct[];
  selectedProduct: IProduct | null;
  error: string;
};

interface IUpdateProduct {
  id: string;
  product: IProduct;
}

const initialState: InitialState = {
  loading: false,
  products: [],
  selectedProduct: null,
  error: '',
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

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

export const getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
  try {
    const response = await http.get<IProduct[]>('/products', headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

export const addNewProduct = createAsyncThunk('product/addNew', async (product: IProduct) => {
  try {
    const response = await http.post<IProduct>('/products', product, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add new product');
  }
});

export const getProductById = createAsyncThunk('product/getProductById', async (id: string) => {
  console.log("getPRoductID")
  try {
    const response = await http.get<IProduct>(`/products/${id}`, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product by ID');
  }
});

export const updateProduct = createAsyncThunk('product/update', async (data: IUpdateProduct) => {
  try {
    const response = await http.put(`/products/${data.id}`, data.product, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
});

export const removeProduct = createAsyncThunk('product/remove', async (id: string) => {
  try {
    await http.delete(`/products/${id}`, headers);
    return id;
  } catch (error) {
    throw new Error('Failed to remove product');
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    // Get all products
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload; // Replace the entire products array with the fetched data
      state.error = '';
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || 'Failed to fetch products';
    });
    
    // Add new product
    builder.addCase(addNewProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      state.error = '';
    });
    builder.addCase(addNewProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // Selected product
    builder.addCase(getProductById.pending, state => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
      state.error = '';
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.selectedProduct = null;
      state.error = action.error.message || 'Something went wrong';
    });

    // Update product
    builder.addCase(updateProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });

    // Remove product
    builder.addCase(removeProduct.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
      state.loading = false;
      state.error = '';
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default productSlice.reducer;
