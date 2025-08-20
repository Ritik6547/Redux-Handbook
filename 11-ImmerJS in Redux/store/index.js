import { combineReducers, createStore } from "redux";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import wishListReducer from "./slices/wishListSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);
