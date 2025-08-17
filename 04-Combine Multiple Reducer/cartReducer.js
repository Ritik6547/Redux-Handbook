import { ACTIONS } from "./script";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM:
      return [...state, action.payload];

    case ACTIONS.CART_REMOVE_ITEM:
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );

    case ACTIONS.CART_ITEM_INCREASE_QUANTITY:
      return state.map((item) =>
        item.productId === action.payload.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case ACTIONS.CART_ITEM_DECREASE_QUANTITY:
      return state
        .map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return state;
  }
}
