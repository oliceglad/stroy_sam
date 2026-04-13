import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./CookieConsent.module.scss";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={s.cookieConsent}>
      <div className={s.cookieConsent__content}>
        <p className={s.cookieConsent__text}>
          Мы используем файлы cookie для корректной работы сайта, анализа трафика
          и улучшения сервиса. Продолжая использовать сайт, вы соглашаетесь с
          использованием cookie и обработкой персональных данных в соответствии с{" "}
          <Link to="/data-policy" className={s.cookieConsent__link}>
            Политикой конфиденциальности
          </Link>.
        </p>
        <div className={s.cookieConsent__actions}>
          <button className={s.cookieConsent__accept} onClick={handleAccept}>
            Принять
          </button>
          <Link to="/cookie-policy" className={s.cookieConsent__details}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
