import { combineReducers, createStore } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import wishListReducer from "./wishListReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);
