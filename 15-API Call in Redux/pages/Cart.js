import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

export default function Cart() {
  const cartItems = useSelector(({ cartItems, products }) => {
    return cartItems.list
      .map((item) => {
        const product = products.list.find(
          (product) => product.id === item.productId
        );
        return { ...product, quantity: item.quantity };
      })
      .filter(({ title }) => title);
  });
  const isLoading = useSelector((state) => state.cartItems.loading);
  const error = useSelector((state) => state.cartItems.error);

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          cartItems.map(({ id, title, rating, price, image, quantity }) => (
            <CartItem
              key={id}
              productId={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {!isLoading && !error && (
            <div className="total">
              $
              {cartItems.reduce((total, item) => {
                return total + item.quantity * item.price;
              }, 0)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
