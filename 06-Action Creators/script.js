import { combineReducers, createStore } from "redux";
import productsReducer from "./productsReducer";
import cartReducer, {
  addCartItem,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from "./cartReducer";
import wishListReducer, {
  addWishlistItem,
  removeWishlistItem,
} from "./wishListReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch(addCartItem(10, 2));
store.dispatch(addCartItem(12, 4));
store.dispatch(removeCartItem(10));
store.dispatch(increaseCartItemQuantity(12));
store.dispatch(decreaseCartItemQuantity(12));
store.dispatch(decreaseCartItemQuantity(12));

store.dispatch(addWishlistItem(15));
store.dispatch(addWishlistItem(18));
store.dispatch(removeWishlistItem(15));
