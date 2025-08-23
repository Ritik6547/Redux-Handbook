import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./productsSlice";

const findItemIndex = (state, action) => {
  return state.findIndex((item) => item.productId === action.payload.productId);
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
      state.error = "";
    },
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    },
    loadCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
      state.error = "";
    },
    addCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity += 1;
      } else {
        state.list.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity += 1;
    },
    decreaseCartItemQuantity(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      state.list[existingItemIndex].quantity -= 1;
      if (state.list[existingItemIndex].quantity === 0) {
        state.list.splice(existingItemIndex, 1);
      }
    },
  },
});

const cartItems = (state) => state.cartItems.list;
export const getAllCartItems = createSelector(
  [getAllProducts, cartItems],
  (products, cartItems) => {
    return cartItems
      .map((item) => {
        const product = products.find(
          (product) => product.id === item.productId
        );
        return { ...product, quantity: item.quantity };
      })
      .filter(({ title }) => title);
  }
);
export const getCartLoadingState = (state) => state.cartItems.loading;
export const getCartError = (state) => state.cartItems.error;

export const {
  addCartItem,
  removeCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  loadCartItems,
  fetchCartItems,
  fetchCartItemsError,
} = cartSlice.actions;

export default cartSlice.reducer;
