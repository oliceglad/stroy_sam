import React from "react";
import s from "./ContactsPage.module.scss";
import maxLogo from "../assets/max_logo.png";
// Using the generated image path - normally we would move this to assets, but for now I'll reference the artifact or a placeholder. 
// Since I can't easily move the artifact to src/assets in this environment without multiple steps, I will use a local variable for the image path if I can, OR just use a placeholder text/style content.
// WAIT - I can only use files in the src directory for the build.
// I will copy the artifact to src/assets first? No, I should use the `run_command` to move it.

const ContactsPage = () => {
  return (
    <div className={s.contacts}>
      <h1 className={s.contacts__title}>Контакты</h1>
      
      <div className={s.contacts__content}>
        <div className={s.contacts__info}>
            <div className={s.contacts__item}>
                <h3>Адрес</h3>
                <p>г. Самара, Волжский район, СДТ Стремилово, СДТ Лесопилов, 28 линия 280</p>
            </div>
            
            <div className={s.contacts__item}>
                <h3>Телефон</h3>
                <a href="tel:89278988080">8 927 898 80 80</a>
            </div>

            <div className={s.contacts__item}>
                <h3>Режим работы</h3>
                <p>Пн-Вс: 09:00 - 19:00</p>
            </div>

            <div className={s.contacts__item}>
                <h3>Мы в соцсетях</h3>
                <div className={s.contacts__socials}>
                    <a href="#" className={s.contacts__socialLink}>Telegram</a>
                    <a href="#" className={s.contacts__socialLink}>
                        <img src={maxLogo} alt="Max" style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle', borderRadius: '4px' }} />
                        Max
                    </a>
                </div>
            </div>
        </div>

        <div className={s.contacts__imageWrapper}>
           <img src="/src/assets/store_interior.png" alt="Наш магазин" className={s.contacts__image} />
        </div>
      </div>

      <div className={s.contacts__map}>
         <iframe 
            src="https://yandex.ru/map-widget/v1/?ll=39.638062%2C47.243542&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgg1NzM5NDE5NxJC0KDQvtGB0YLQvtCyLdC90LAt0JTQvtC90YMsINGD0LvQuNGG0LAg0JTQvtCy0LDRgtC-0YDQsCwgMTQ40LMiCg2%2F6xBCFVnUPII%3D&z=16.63" 
            width="100%" 
            height="400" 
            frameBorder="0" 
            allowFullScreen={true}
            style={{border: 0, borderRadius: "12px"}}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactsPage;
