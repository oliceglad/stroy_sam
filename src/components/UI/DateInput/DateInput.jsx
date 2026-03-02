import React from "react";
import styles from "./DateInput.module.scss";

const DateInput = ({ value, onChange, placeholder, label, style, error }) => {
  return (
    <div className={styles.wrapper} style={{...style}}>
      {label && <label className={styles.dateInput__label}>{label}</label>}
      <input
        className={`${styles.dateInput} ${error ? styles.errorField : ""}`}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default DateInput;
