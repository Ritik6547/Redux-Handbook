import { useSelector } from "react-redux";
import Product from "../components/Product";

const Home = () => {
  const products = useSelector((state) => state.products);
  return (
    <div className="products-container">
      {products.map(({ id, title, rating, price, image }) => {
        return (
          <Product
            productId={id}
            key={id}
            title={title}
            rating={rating.rate}
            price={price}
            imageUrl={image}
          />
        );
      })}
    </div>
  );
};

export default Home;
