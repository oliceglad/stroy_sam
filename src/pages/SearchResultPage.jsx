import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchProductsQuery } from "../api/products";
import ProductCard from "../components/ProductCard/ProductCard";
import { Loader } from "../components/UI/Loader/Loader";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("query") || "";
  const { data: products, isLoading, error } = useSearchProductsQuery(query);

  return (
    <div className="searchPage">
      <h1 className="searchPage__title">
        Результаты поиска по: <span>"{query}"</span>
      </h1>

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      )}
      {error && <p>Ошибка при поиске</p>}

      {products?.length > 0 ? (
        <ul className="searchPage__products">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        !isLoading && (
          <div className="searchPage__notfound">Ничего не найдено</div>
        )
      )}
    </div>
  );
};

export default SearchResultsPage;
