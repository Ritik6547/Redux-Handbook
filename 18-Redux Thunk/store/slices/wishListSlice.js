import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    addWishlistItem(state, action) {
      state.push(action.payload);
    },
    removeWishlistItem(state, action) {
      const existingItemIndex = state.findIndex(
        (item) => item.productId === action.payload.productId
      );
      state.splice(existingItemIndex, 1);
    },
  },
});

export const { addWishlistItem, removeWishlistItem } = wishlistSlice.actions;

export default wishlistSlice.reducer;
