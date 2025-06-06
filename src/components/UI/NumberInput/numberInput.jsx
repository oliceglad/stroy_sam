import React, { useState } from "react";
import styles from "./NumberInput.module.scss";

const NumberInput = ({ length = 6, onChange }) => {
  const [values, setValues] = useState(Array(length).fill(""));

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newValues = [...values];
      newValues[idx] = val;
      setValues(newValues);
      onChange && onChange(newValues.join(""));
      if (val && idx < length - 1) {
        const nextInput = document.getElementById(`code-input-${idx + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      const prevInput = document.getElementById(`code-input-${idx - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className={styles["number-input"]}>
      {values.map((v, i) => (
        <input
          key={i}
          id={`code-input-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={styles["number-input__cell"]}
        />
      ))}
    </div>
  );
};

export default NumberInput;
