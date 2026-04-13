import React from "react";
import s from "./DocumentPage.module.scss";

const CookiePolicyPage = () => {
    return (
        <div className={s.document}>
            <h1 className={s.document__title}>Использование файлов cookie</h1>
            <div className={s.document__content}>
                <p>Сайт использует файлы cookie — небольшие текстовые файлы, которые сохраняются на вашем устройстве.</p>
                
                <p><strong>Cookie используются для:</strong></p>
                <ul>
                    <li>обеспечения работы сайта</li>
                    <li>запоминания пользовательских настроек</li>
                    <li>анализа поведения пользователей</li>
                </ul>
                
                <p>Также могут использоваться аналитические сервисы.</p>
                <p>Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу сайта.</p>
            </div>
        </div>
    );
};

export default CookiePolicyPage;
