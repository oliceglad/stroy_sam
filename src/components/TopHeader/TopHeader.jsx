import React from "react";
import { NavLink } from "react-router-dom";
import s from "./TopHeader.module.scss";
import maxLogo from "../../assets/max_logo.png";

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.0669 3.32833C21.6506 2.74467 22.4276 3.42433 22.1359 4.15233L19.4979 16.9293C19.2979 17.8933 18.2569 18.2733 17.4789 17.7553L12.9269 14.5443L10.7499 16.5913C10.4579 16.8833 9.9729 16.7953 9.8759 16.3873L8.6139 12.0863L2.6249 10.2373C1.6529 9.94633 1.7699 8.57533 2.7609 8.24433L21.0669 3.32833ZM19.5539 5.38533L4.3589 9.84033L8.9849 11.2333C9.3739 11.3503 9.6849 11.6993 9.8019 12.0883L11.0649 16.3093L13.1079 14.4573C13.5649 14.0453 14.2889 14.1723 14.5919 14.6723L17.7299 16.8903L20.0079 5.83933L19.5539 5.38533Z" fill="#229ED9"/>
  </svg>
);

const MaxIcon = () => (
  <img src={maxLogo} alt="Max" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
);

const TopHeader = () => {
    return (
        <div className={s.topHeader}>
            <div className={s.topHeader__container}>
                <div className={s.topHeader__left}>
                    <a
                        href="https://yandex.ru/maps/?text=Волжский+район,+СДТ+Стремилово,+СДТ+Лесопилов,+28+линия+280"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.topHeader__address}
                    >
                        Самара
                    </a>
                    <div className={s.topHeader__subnav}>
                        <NavLink to="/delivery-info" className={s.topHeader__subLink}>
                            Доставка
                        </NavLink>
                        <NavLink to="/payment" className={s.topHeader__subLink}>
                            Оплата
                        </NavLink>
                        <NavLink to="/cooperation" className={s.topHeader__subLink}>
                            Сотрудничество
                        </NavLink>
                        <NavLink to="/b2b" className={s.topHeader__subLink}>
                            В2В
                        </NavLink>
                    </div>
                </div>
                <div className={s.topHeader__right}>
                    <NavLink to="/contacts" className={s.topHeader__link}>
                        О нас
                    </NavLink>
                    <button className={s.topHeader__callbackBtn} onClick={() => alert("Мы скоро вам перезвоним!")}>
                        Заказать звонок
                    </button>
                    <div className={s.topHeader__schedule}>
                        Пн-Вс: 09:00 - 19:00
                    </div>
                    <div className={s.topHeader__phoneWrapper}>
                        <a href="tel:89278988080" className={s.topHeader__phone}>
                            8 927 898 80 80 
                            <span style={{fontSize: '10px'}}>▼</span>
                        </a>
                        <div className={s.topHeader__dropdown}>
                            <ul className={s.socialParams}>
                                <li className={s.socialParams__item}>
                                    <a href="#" className={s.socialParams__link}>
                                        <TelegramIcon /> Telegram
                                    </a>
                                </li>
                                <li className={s.socialParams__item}>
                                    <a href="#" className={s.socialParams__link}>
                                        <MaxIcon /> Max
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
