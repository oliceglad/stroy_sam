import React from "react";
import styles from "./Filters.module.scss";
import { Loader } from "../UI/Loader/Loader";
import CustomCheckbox from "../UI/CustomCheckbox/CustomCheckbox";

const Filters = ({
  options = [],
  selectedFilters = {},
  onToggle,
  onApply,
  onClear,
  isApplying = false,
  isLoading = false,
}) => {
  return (
    <aside className={styles.filters}>
      {isLoading ? (
        <Loader />
      ) : options?.length === 0 ? (
        <div className={styles.filters__empty}>Нет доступных фильтров</div>
      ) : (
        <>
          {options.map((opt) => (
            <div key={opt.attribute_name} className={styles.filters__group}>
              <div className={styles.filters__group__title}>{opt.attribute_name}</div>
              <div className={styles.filters__group__options}>
                {opt.attribute_value.map((val) => {
                  const checked =
                    selectedFilters[opt.attribute_name]?.includes(val);
                  return (
                    <CustomCheckbox
                      key={val}
                      label={val}
                      checked={!!checked}
                      onChange={() => onToggle(opt.attribute_name, val)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div className={styles.filters__actions}>
            <button
              className={styles.filters__actions__applyBtn}
              onClick={onApply}
              disabled={isApplying || isLoading}
            >
              {isApplying ? "Применение..." : "Применить"}
            </button>
            <button
              className={styles.filters__actions__clearBtn}
              onClick={onClear}
              disabled={isApplying || isLoading}
            >
              Сбросить
            </button>
          </div>
        </>
      )}
    </aside>
  );
};

export default Filters;
