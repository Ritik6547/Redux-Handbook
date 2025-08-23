import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
      state.error = "";
    },
    fetchProductsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something Went Wrong";
    },
    updateProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

export const { updateProducts, fetchProducts, fetchProductsError } =
  productSlice.actions;

export default productSlice.reducer;
