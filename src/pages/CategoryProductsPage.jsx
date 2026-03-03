import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetProductsByCategoryIdQuery,
  useGetFilterOptionsQuery,
  useGetProductsByFilterMutation,
} from "../api/products";

import ProductCard from "../components/ProductCard/ProductCard";
import Filters from "../components/Filters/Filters";
import { Loader } from "../components/UI/Loader/Loader";
import CategoryProductsPageSkeleton from "./CategoryProductsPageSkeleton";

const CategoryProductsPage = () => {
  const { categoryId, subId } = useParams();
  const activeCategoryId = subId || categoryId;

  const { data: products, isLoading: isLoadingCategoryProducts } =
    useGetProductsByCategoryIdQuery(activeCategoryId, {
      skip: !activeCategoryId,
    });

  const { data: filterOptions, isLoading: isFilterOptionsLoading } =
    useGetFilterOptionsQuery(activeCategoryId, { skip: !activeCategoryId });

  const [getProductsByFilter, { isLoading: isFiltering }] =
    useGetProductsByFilterMutation();

  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedFilters({});
    setFilteredProducts(null);
  }, [activeCategoryId]);

  const handleToggleOption = (attributeName, value) => {
    setSelectedFilters((prev) => {
      const cur = { ...prev };
      const arr = cur[attributeName] ? [...cur[attributeName]] : [];
      if (arr.includes(value)) {
        const newArr = arr.filter((v) => v !== value);
        if (newArr.length === 0) delete cur[attributeName];
        else cur[attributeName] = newArr;
      } else {
        cur[attributeName] = [...arr, value];
      }
      return cur;
    });
  };

  const applyFilters = async () => {
    if (!activeCategoryId) return;

    const filtersArray = Object.entries(selectedFilters).map(
      ([attribute_name, attribute_value]) => ({
        attribute_name,
        attribute_value,
      })
    );

    if (filtersArray.length === 0) {
      setFilteredProducts(null);
      return;
    }

    try {
      const res = await getProductsByFilter({
        categoryId: activeCategoryId,
        filters: filtersArray,
      }).unwrap();
      setFilteredProducts(res);
    } catch (err) {
      console.error("Ошибка при получении товаров по фильтру:", err);
    }
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setFilteredProducts(null);
  };

  const displayedProducts = filteredProducts ?? products;
  const isLoading = isLoadingCategoryProducts && !displayedProducts;
  const noResults =
    !isLoading && (!displayedProducts || displayedProducts.length === 0);

  return (
    <div className="categoryProductPage">
      {!noResults && (
        <button
          className="categoryProductPage__filtersBtn"
          onClick={() => setIsFiltersOpen(true)}
        >
          Фильтры
        </button>
      )}

      <div className="categoryProductPage__body">
        {isFiltersOpen && (
          <div
            className="categoryProductPage__overlay"
            onClick={() => setIsFiltersOpen(false)}
          />
        )}

        <div
          className={`categoryProductPage__filtersWrapper ${
            isFiltersOpen ? "open" : ""
          }`}
        >
          {!noResults && (
            <Filters
              options={filterOptions}
              selectedFilters={selectedFilters}
              onToggle={handleToggleOption}
              onApply={applyFilters}
              onClear={clearFilters}
              isApplying={isFiltering}
              isLoading={isFilterOptionsLoading}
              onClose={() => setIsFiltersOpen(false)}
            />
          )}
        </div>

        <main className="categoryProductPage__content">
          {(isLoading || isFiltering) && (
            <CategoryProductsPageSkeleton />
          )}

          {noResults ? (
            <p className="categoryProductPage__notfound">Товаров не найдено</p>
          ) : !isFiltering ? (
            <ul className="categoryProductPage__products">
              {displayedProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default CategoryProductsPage;
