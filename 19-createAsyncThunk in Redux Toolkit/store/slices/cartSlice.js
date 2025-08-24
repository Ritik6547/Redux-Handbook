import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { getAllProducts } from "./productsSlice";

const findItemIndex = (state, action) => {
  return state.findIndex((item) => item.productId === action.payload.productId);
};

// Thunk Action Creator
export const fetchCartItemsData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/carts/1`);
      return res.json();
    } catch (err) {
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    list: [],
    error: "",
  },
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCartItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.error = "";
      })
      .addCase(fetchCartItemsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const getCartItems = (state) => state.cartItems.list;
export const getDetailedCartItems = createSelector(
  [getAllProducts, getCartItems],
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
} = cartSlice.actions;

export default cartSlice.reducer;
