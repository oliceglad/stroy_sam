import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAutocompleteProductsQuery,
  useSearchProductsQuery,
} from "../../../api/products";
import styles from "./SearchInput.module.scss";

const SearchInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const { data: suggestions } = useAutocompleteProductsQuery(inputValue, {
    skip: inputValue.length < 2,
  });

  const { data: results } = useSearchProductsQuery(inputValue, {
    skip: inputValue.length < 2,
  });

  const handleSelect = (product) => {
    setInputValue(product.product_name);
    setShowDropdown(false);
    navigate(
      `/products/search/?query=${encodeURIComponent(product.product_name)}`
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(e.target.value.length >= 2);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.length >= 2) {
      setShowDropdown(false);
      navigate(`/products/search?query=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className={styles.searchInput}>
      <input
        type="text"
        placeholder="Поиск..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => inputValue.length >= 2 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
        className={styles.searchInput__input}
      />
      {showDropdown && suggestions && (
        <ul className={styles.searchInput__dropdown}>
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className={styles.searchInput__dropdown__item}
            >
              {item.product_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
