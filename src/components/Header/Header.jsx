import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import SearchInput from "../UI/SearchInput/SearchInput";
import { Search } from "../UI/Search/Search";
import { User } from "../UI/User/User";
import { Cart } from "../UI/Cart/Cart";
import { Catalog } from "../UI/Catalog/Catalog";
import { useGetCartContentsQuery } from "../../api/cart";

const Header = () => {
  const { data, isSuccess } = useGetCartContentsQuery();

  const cartCount = isSuccess
    ? data?.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <header className={s.header}>
      <div className={s.header__left}>
        <NavLink to="/categories" className={s.header__link}>
          <Catalog className={s.header__icon} />
        </NavLink>
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
        <NavLink to="/cart" className={s.header__link}>
          <Cart className={s.header__icon} count={cartCount} />
        </NavLink>

        <NavLink to="/profile" className={s.header__link}>
          <User className={s.header__icon} />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
