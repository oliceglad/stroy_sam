import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomSelect.module.scss";

const CustomSelect = ({selectTitle, options, value, onChange, placeholder, classSelect = "", classSelected = ""}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div
      className={`${styles.customSelect} ${classSelect}`}
      ref={ref}
      tabIndex={0}
    >
      <div
        className={`${styles.selected} ${classSelected}`}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedLabel}
        <span className={styles.arrow}>&#9662;</span>
      </div>

      {isOpen && (
        <ul className={styles.options} role="listbox">
          <li
            className={!value ? styles.optionSelected : ""}
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            role="option"
            aria-selected={!value}
            tabIndex={0}
          >
            {selectTitle}
          </li>
          {options.map(({ value: val, label }) => (
            <li
              key={val}
              className={val === value ? styles.optionSelected : ""}
              onClick={() => {
                onChange(val);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={val === value}
              tabIndex={0}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
