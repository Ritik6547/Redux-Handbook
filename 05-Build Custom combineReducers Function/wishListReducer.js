import { ACTIONS } from "./script";

export default function wishListReducer(state = [], action) {
  switch (action.type) {
    case ACTIONS.WISHLIST_ADD_ITEM:
      return [...state, action.payload];

    case ACTIONS.WISHLIST_REMOVE_ITEM:
      return state.filter(
        (item) => item.productId !== action.payload.productId
      );

    default:
      return state;
  }
}
