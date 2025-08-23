import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "url:../assets/cart-icon.svg";
import {
  fetchProducts,
  fetchProductsError,
  updateProducts,
} from "../store/slices/productsSlice";
import {
  fetchCartItems,
  fetchCartItemsError,
  getCartItems,
  loadCartItems,
} from "../store/slices/cartSlice";
import { fetchData } from "../store/middleware/api";

export default function Header() {
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchData({
        url: "products",
        onStart: fetchProducts.type,
        onSuccess: updateProducts.type,
        onError: fetchProductsError.type,
      })
    );

    dispatch(
      fetchData({
        url: "carts/1",
        onStart: fetchCartItems.type,
        onSuccess: loadCartItems.type,
        onError: fetchCartItemsError.type,
      })
    );
  }, []);

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <Link className="cart-icon" to="/cart">
          <img src={CartIcon} alt="cart-icon" />
          <div className="cart-items-count">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </Link>
      </div>
    </header>
  );
}
