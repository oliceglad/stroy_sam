import React from "react";
import styles from "./Button.module.scss";

const Button = ({
  children,
  onClick,
  className = "",
  style = {},
  buttonProps = {},
}) => {
  return (
    <button
      className={`${styles["custom-button"]} ${className}`}
      style={style}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
