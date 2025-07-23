import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import SearchInput from "../UI/SearchInput/SearchInput";
import { Search } from "../UI/Search/Search";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const mockHistory = ["Обои", "Ламинат", "Краска", "Дрель", "Кафель"];

  const handleSelectItem = (item) => {
    setSearchValue(item);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length >= 2) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <header className={s.header}>
      <div className={s.header__left}>
        <NavLink to="/categories" className={s.header__link}>
          <svg
            width="27"
            height="20"
            viewBox="0 0 27 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.header__icon}
          >
            <line
              x1="0.920898"
              y1="1.25"
              x2="25.4546"
              y2="1.25"
              stroke="#161616"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="0.920898"
              y1="10.25"
              x2="18.3545"
              y2="10.25"
              stroke="#161616"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="0.920898"
              y1="19.25"
              x2="12.4377"
              y2="19.25"
              stroke="#161616"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </NavLink>
        <NavLink to="/catalog" className={s.header__logo}>
          <h1 className={s.header__title}>СтройСам</h1>
        </NavLink>
      </div>

      <div className={s.header__center}>
        <div className={s.header__searchWrapper}>
          <Search className={s.header__searchIcon}/>
          <SearchInput />
        </div>
      </div>

      <div className={s.header__right}>
        <NavLink to="/cart" className={s.header__link}>
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.header__icon}
          >
            <path
              d="M18 37C19.1046 37 20 36.1046 20 35C20 33.8954 19.1046 33 18 33C16.8954 33 16 33.8954 16 35C16 36.1046 16.8954 37 18 37Z"
              fill="#1C1B1B"
            />
            <path
              d="M31 37C32.1046 37 33 36.1046 33 35C33 33.8954 32.1046 33 31 33C29.8954 33 29 33.8954 29 35C29 36.1046 29.8954 37 31 37Z"
              fill="#1C1B1B"
            />
            <path
              d="M13.2875 17H35.7125L32.4125 28.55C32.2948 28.9692 32.0426 29.3381 31.6948 29.6001C31.3471 29.862 30.9229 30.0025 30.4875 30H18.5125C18.0771 30.0025 17.6529 29.862 17.3052 29.6001C16.9574 29.3381 16.7052 28.9692 16.5875 28.55L12.0625 12.725C12.0027 12.5159 11.8764 12.3321 11.7027 12.2012C11.529 12.0704 11.3174 11.9998 11.1 12H9"
              stroke="#1C1B1B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="23.25"
              y="3.25"
              width="21.5"
              height="21.5"
              rx="10.75"
              fill="#FB4E4E"
            />
            <rect
              x="23.25"
              y="3.25"
              width="21.5"
              height="21.5"
              rx="10.75"
              stroke="#FFFEFE"
              strokeWidth="1.5"
            />
            <path
              d="M34.0007 18.132C32.9967 18.132 32.2067 17.754 31.6307 16.998C31.0587 16.242 30.7727 15.14 30.7727 13.692C30.7727 12.716 30.9047 11.896 31.1687 11.232C31.4327 10.564 31.8067 10.06 32.2907 9.72C32.7747 9.376 33.3467 9.204 34.0067 9.204C34.9987 9.204 35.7827 9.586 36.3587 10.35C36.9387 11.11 37.2287 12.22 37.2287 13.68C37.2287 15.132 36.9407 16.238 36.3647 16.998C35.7927 17.754 35.0047 18.132 34.0007 18.132ZM34.0067 16.914C34.5707 16.914 34.9907 16.664 35.2667 16.164C35.5427 15.664 35.6807 14.838 35.6807 13.686C35.6807 12.51 35.5407 11.666 35.2607 11.154C34.9807 10.642 34.5607 10.386 34.0007 10.386C33.4407 10.386 33.0167 10.644 32.7287 11.16C32.4447 11.676 32.3027 12.518 32.3027 13.686C32.3027 14.834 32.4447 15.66 32.7287 16.164C33.0167 16.664 33.4427 16.914 34.0067 16.914Z"
              fill="#FFFEFE"
            />
          </svg>
        </NavLink>

        <NavLink to="/lk" className={s.header__link}>
          <svg
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.header__icon}
          >
            <path
              d="M24 28C28.4183 28 32 24.4183 32 20C32 15.5817 28.4183 12 24 12C19.5817 12 16 15.5817 16 20C16 24.4183 19.5817 28 24 28Z"
              stroke="#1C1B1B"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M11.875 35C13.1037 32.8714 14.871 31.1038 16.9994 29.8749C19.1278 28.6459 21.5423 27.9989 24 27.9989C26.4577 27.9989 28.8722 28.6459 31.0006 29.8749C33.129 31.1038 34.8963 32.8714 36.125 35"
              stroke="#1C1B1B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
