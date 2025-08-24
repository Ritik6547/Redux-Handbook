import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartIcon from "url:../assets/cart-icon.svg";
import { fetchProductsData } from "../store/slices/productsSlice";
import { fetchCartItemsData, getCartItems } from "../store/slices/cartSlice";

export default function Header() {
  const cartItems = useSelector(getCartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());
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
