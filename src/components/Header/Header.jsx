import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import SearchInput from "../UI/SearchInput/SearchInput";
import { Search } from "../UI/Search/Search";
import { User } from "../UI/User/User";
import { Cart } from "../UI/Cart/Cart";
import { useGetCartContentsQuery } from "../../api/cart";

const Header = () => {
  const { data, isSuccess } = useGetCartContentsQuery();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartCount =
    data?.data != null && isSuccess
      ? data?.data.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

  return (
    <header className={s.header}>
      <div className={s.header__left}>
        <NavLink to="/" className={s.header__logo}>
          <h1 className={s.header__title}>СтройСам</h1>
        </NavLink>
      </div>

      <div className={s.header__center}>
        <div className={s.header__searchWrapper}>
          <Search className={s.header__searchIcon} />
          <SearchInput />
        </div>
      </div>

      <div className={s.header__right}>
        <button
          className={s.header__searchBtn}
          onClick={() => setMobileSearchOpen((prev) => !prev)}
        >
          <Search className={s.header__icon} />
        </button>

        <NavLink to="/cart" className={s.header__link}>
          <Cart className={s.header__icon} count={cartCount} />
        </NavLink>

        <NavLink to="/profile" className={s.header__link}>
          <User className={s.header__icon} />
        </NavLink>
      </div>
      {mobileSearchOpen && (
        <>
          <div
            className={s.header__overlay}
            onClick={() => setMobileSearchOpen(false)}
          />
          <div className={s.header__mobileSearch}>
            <SearchInput onSearchEnd={() => setMobileSearchOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
