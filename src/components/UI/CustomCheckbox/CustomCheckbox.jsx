import React from "react";
import styles from "./CustomCheckbox.module.scss";

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <label className={styles.customCheckbox}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.customCheckbox__input}
      />
      <span className={styles.customCheckbox__box}>
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className={styles.customCheckbox__icon}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              d="M4 12l5 5L20 7"
            />
          </svg>
        )}
      </span>
      <span className={styles.customCheckbox__label}>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
