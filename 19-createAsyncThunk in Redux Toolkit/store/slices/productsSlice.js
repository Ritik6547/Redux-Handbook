import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunk Action Creator
export const fetchProductsData = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      return res.json();
    } catch (err) {
      throw err;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = "";
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something Went Wrong";
      });
  },
});

export const getAllProducts = (state) => state.products.list;
export const getProductsLoading = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

export default productSlice.reducer;
