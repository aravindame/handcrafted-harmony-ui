import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import IProduct from '@/types/product.interface';
import { getSession } from 'next-auth/react';

/**
 * Represents the initial state of the product slice.
 */
type InitialState = {
  /**
   * Indicates if products are being fetched or updated.
   */
  loading: boolean;
  /**
   * An array of products.
   */
  products: IProduct[];
  /**
   * The selected product.
   */
  selectedProduct: IProduct | null;
  /**
   * Error message, if any, during product operations.
   */
  error: string;
};

/**
 * Represents the data required to update a product.
 */
interface IUpdateProduct {
  id: string;
  product: IProduct;
}

/**
 * The initial state for the product slice.
 */
const initialState: InitialState = {
  loading: false,
  products: [],
  selectedProduct: null,
  error: '',
};

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

/**
 * Async thunk to fetch all products.
 */
export const getAllProducts = createAsyncThunk<IProduct[], void>('product/getAllProducts', async () => {
  try {
    const session:any = await getSession();
    const token = session?.accessToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: process.env.HEADERS_HOST,
        Origin: process.env.HEADERS_ORIGIN,
      },
    };
    const response = await http.get<IProduct[]>('/products', headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

/**
 * Async thunk to add a new product.
 * @param product - The product to be added.
 */
export const addNewProduct = createAsyncThunk<IProduct, IProduct>('product/addNew', async (product) => {
  try {
    const session:any = await getSession();
    const token = session?.accessToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: process.env.HEADERS_HOST,
        Origin: process.env.HEADERS_ORIGIN,
      },
    };
    const response = await http.post<IProduct>('/products', product, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add a new product');
  }
});

/**
 * Async thunk to fetch a product by ID.
 * @param id - The ID of the product to be fetched.
 */
export const getProductById = createAsyncThunk<IProduct, string>('product/getProductById', async (id) => {
  try {
    const session:any = await getSession();
    const token = session?.accessToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: process.env.HEADERS_HOST,
        Origin: process.env.HEADERS_ORIGIN,
      },
    };
    const response = await http.get<IProduct>(`/products/${id}`, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product by ID');
  }
});

/**
 * Async thunk to update a product.
 * @param data - The data required to update the product.
 */
export const updateProduct = createAsyncThunk<IProduct, IUpdateProduct>('product/update', async (data) => {
  try {
    const session:any = await getSession();
    const token = session?.accessToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: process.env.HEADERS_HOST,
        Origin: process.env.HEADERS_ORIGIN,
      },
    };
    const response = await http.put(`/products/${data.id}`, data.product, headers);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
});

/**
 * Async thunk to remove a product.
 * @param id - The ID of the product to be removed.
 */
export const removeProduct = createAsyncThunk<string, string>('product/remove', async (id) => {
  try {
    const session:any = await getSession();
    const token = session?.accessToken;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, text/plain, */*',
        Host: process.env.HEADERS_HOST,
        Origin: process.env.HEADERS_ORIGIN,
      },
    };
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
    /**
     * Action to reset the products array with new data.
     * @param state - The current state of the product slice.
     * @param action - The action containing the payload with the new products array.
     */
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
