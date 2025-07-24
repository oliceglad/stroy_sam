import React from "react";
import styles from "./ProfileInfo.module.scss";

const ProfileInfo = ({ user, onLogout }) => {
  return (
    <div className={styles.profileInfo}>
      <h3 className={styles.profileInfo__name}>
        {user?.first_name} {user?.last_name}
      </h3>
      <p className={styles.profileInfo__email}>{user?.email}</p>
      <p className={styles.profileInfo__phone}>+7{user?.phone}</p>

      <button className={styles.profileInfo__logout} onClick={onLogout}>
        Выйти из профиля
      </button>
    </div>
  );
};

export default ProfileInfo;
