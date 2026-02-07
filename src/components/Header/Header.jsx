import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.scss";
import SearchInput from "../UI/SearchInput/SearchInput";
import { Search } from "../UI/Search/Search";
import { Catalog } from "../UI/Catalog/Catalog";
import { User } from "../UI/User/User";
import { Favorites } from "../UI/Favorites/Favorites";
import { Cart } from "../UI/Cart/Cart";
import { useGetCartContentsQuery } from "../../api/cart";
import { useGetMeQuery } from "../../api/user";

const Header = () => {
  const { data: cartData, isSuccess: isCartSuccess } = useGetCartContentsQuery();
  const { data: userData, isSuccess: isUserSuccess } = useGetMeQuery();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartCount =
    cartData?.data != null && isCartSuccess
      ? cartData?.data.reduce((sum, item) => sum + item.quantity, 0)
      : 0;

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <div className={s.header__left}>
          <NavLink to="/" className={s.header__logo}>
            <h1 className={s.header__title}>СтройСам</h1>
          </NavLink>
        </div>

        <div className={s.header__center}>
          <NavLink to="/categories" className={s.header__catalogBtn}>
            <Catalog className={s.header__catalogIcon} />
            Каталог
          </NavLink>
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

          <NavLink to="/favorites" className={s.header__link}>
            <Favorites className={s.header__icon} />
          </NavLink>

          <NavLink to="/cart" className={s.header__link}>
            <Cart className={s.header__icon} count={cartCount} />
          </NavLink>

          {isUserSuccess && userData ? (
            <NavLink to="/profile" className={s.header__link}>
              <User className={s.header__icon} />
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={`${s.header__link} ${s.header__loginBtn}`}
            >
              Войти
            </NavLink>
          )}
        </div>
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
