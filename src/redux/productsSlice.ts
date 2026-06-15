import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchProducts =
  createAsyncThunk(
    'products/fetchProducts',
    async () => {
      const response =
        await axios.get(
          'https://fakestoreapi.com/products',
        );

      return response.data;
    },
  );

interface ProductState {
  products: any[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(
        fetchProducts.pending,
        state => {
          state.loading = true;
        },
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products =
            action.payload;
        },
      )

      .addCase(
        fetchProducts.rejected,
        state => {
          state.loading = false;
        },
      );
  },
});

export default productsSlice.reducer;