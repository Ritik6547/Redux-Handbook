import { useSelector } from "react-redux";
import Product from "../components/Product";
import {
  getAllProducts,
  getProductsError,
  getProductsLoading,
} from "../store/slices/productsSlice";

const Home = () => {
  const products = useSelector(getAllProducts);
  const isLoading = useSelector(getProductsLoading);
  const error = useSelector(getProductsError);

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
