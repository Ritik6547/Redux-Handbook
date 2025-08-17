import { createStore } from "redux";
import { productsList } from "./productsList";

const initialState = {
  products: productsList,
  cartItems: [],
  wishList: [],
};

const ACTIONS = {
  CART_ADD_ITEM: "cart/addItem",
  CART_REMOVE_ITEM: "cart/removeItem",
  CART_ITEM_INCREASE_QUANTITY: "cart/increaseItemQuantity",
  CART_ITEM_DECREASE_QUANTITY: "cart/decreaseItemQuantity",

  WISHLIST_ADD_ITEM: "wishList/addItem",
  WISHLIST_REMOVE_ITEM: "wishList/removeItem",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case ACTIONS.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };
    case ACTIONS.CART_ITEM_INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case ACTIONS.CART_ITEM_DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case ACTIONS.WISHLIST_ADD_ITEM:
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };

    case ACTIONS.WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishList: state.wishList.filter(
          (item) => item.productId !== action.payload.productId
        ),
      };

    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 1, quantity: 1 },
});
store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 10, quantity: 4 },
});
store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 12, quantity: 2 },
});
store.dispatch({
  type: ACTIONS.CART_ADD_ITEM,
  payload: { productId: 6, quantity: 1 },
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
  type: ACTIONS.CART_ITEM_INCREASE_QUANTITY,
  payload: { productId: 12 },
});
store.dispatch({
  type: ACTIONS.CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 12 },
});
store.dispatch({
  type: ACTIONS.CART_ITEM_DECREASE_QUANTITY,
  payload: { productId: 6 },
});

store.dispatch({ type: ACTIONS.WISHLIST_ADD_ITEM, payload: { productId: 15 } });
store.dispatch({ type: ACTIONS.WISHLIST_ADD_ITEM, payload: { productId: 18 } });
store.dispatch({
  type: ACTIONS.WISHLIST_REMOVE_ITEM,
  payload: { productId: 15 },
});
