import React from "react";
import styles from "./ProfileInfo.module.scss";

const ProfileInfo = ({ user, onLogout }) => {
  return (
    <div className={styles.profileInfo}>
      <div className={styles.profileInfo__avatar}>
        {user?.first_name?.charAt(0) || "U"}
      </div>
      
      <div className={styles.profileInfo__details}>
        <h3 className={styles.profileInfo__name}>
          {user?.first_name} {user?.last_name}
        </h3>
        <p className={styles.profileInfo__email}>{user?.email}</p>
        <p className={styles.profileInfo__phone}>
          {user?.phone ? `+7${user?.phone}` : "Телефон не указан"}
        </p>
      </div>

      <button className={styles.profileInfo__logout} onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
};

export default ProfileInfo;
