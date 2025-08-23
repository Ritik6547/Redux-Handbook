import { useSelector } from "react-redux";
import Product from "../components/Product";

const Home = () => {
  const products = useSelector((state) => state.products.list);
  const isLoading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
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
