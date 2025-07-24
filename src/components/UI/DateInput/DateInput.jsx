import React from "react";
import styles from "./DateInput.module.scss";

const DateInput = ({ value, onChange, placeholder, label }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.dateInput__label}>{label}</label>}
      <input
        className={styles.dateInput}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DateInput;
