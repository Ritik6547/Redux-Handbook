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

export const getAllProducts = (state) => state.products.list;
export const getProductsLoading = (state) => state.products.loading;
export const getProductsError = (state) => state.products.error;

const { updateProducts, fetchProducts, fetchProductsError } =
  productSlice.actions;

// Thunk Action Creators
export const fetchProductsData = () => (dispatch) => {
  dispatch(fetchProducts());
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => dispatch(updateProducts(data)))
    .catch(() => dispatch(fetchProductsError()));
};

export default productSlice.reducer;
