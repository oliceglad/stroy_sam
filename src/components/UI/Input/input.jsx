import React from "react";
import styles from "./Input.module.scss";

const formatPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const parts = [];

  if (digits.length > 0) parts.push("+7");
  if (digits.length > 1) parts.push(" (" + digits.slice(1, 4));
  if (digits.length >= 4) parts[1] += ")";
  if (digits.length >= 4) parts.push(" " + digits.slice(4, 7));
  if (digits.length >= 7) parts.push("-" + digits.slice(7, 9));
  if (digits.length >= 9) parts.push("-" + digits.slice(9, 11));

  return parts.join("");
};

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  className = "",
  style = {},
  inputProps = {},
  maskType = null,
}) => {
  const handleChange = (e) => {
    let newValue = e.target.value;

    if (maskType === "phone") {
      newValue = formatPhoneNumber(newValue);
    }

    onChange({ target: { value: newValue } });
  };

  const inputType = maskType === "email" ? "email" : "text";

  return (
    <div
      className={`${styles["custom-input-wrapper"]} ${className}`}
      style={style}
    >
      {label && <label className={styles["custom-input-label"]}>{label}</label>}
      <input
        type={inputType}
        className={styles["custom-input-field"]}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default Input;
