import { createStore } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import wishListReducer from "./wishListReducer";

export const ACTIONS = {
  CART_ADD_ITEM: "cart/addItem",
  CART_REMOVE_ITEM: "cart/removeItem",
  CART_ITEM_INCREASE_QUANTITY: "cart/increaseItemQuantity",
  CART_ITEM_DECREASE_QUANTITY: "cart/decreaseItemQuantity",

  WISHLIST_ADD_ITEM: "wishList/addItem",
  WISHLIST_REMOVE_ITEM: "wishList/removeItem",
};

// Custom combineReducers Function
function combineReducers(reducers) {
  return function (state = {}, action) {
    const newState = {};

    for (let key in reducers) {
      const reducer = reducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      newState[key] = nextStateForKey;
    }

    return newState;
  };
}

const rootReducer = combineReducers({
  products: productsReducer,
  cartItems: cartReducer,
  wishList: wishListReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 10, quantity: 4 },
});
store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 12, quantity: 2 },
});
store.dispatch({
  type: ACTIONS.CART_REMOVE_ITEM,
  payload: { productId: 10 },
});
store.dispatch({
  type: ACTIONS.CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 12 },
});
store.dispatch({
  type: ACTIONS.CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 12 },
});

store.dispatch({ type: ACTIONS.WISHLIST_ADD_ITEM, payload: { productId: 15 } });
store.dispatch({ type: ACTIONS.WISHLIST_ADD_ITEM, payload: { productId: 18 } });
store.dispatch({
  type: ACTIONS.WISHLIST_REMOVE_ITEM,
  payload: { productId: 15 },
});
