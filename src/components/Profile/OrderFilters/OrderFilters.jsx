import React, { useState } from "react";
import styles from "./OrderFilters.module.scss";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";
import DateInput from "../../UI/DateInput/DateInput";

const statusOptions = [
  { value: "CREATED", label: "Создан" },
  { value: "PROCESSING", label: "В обработке" },
  { value: "OPERATOR_PROCESSED", label: "Обработан оператором" },
  { value: "CONFIRMED", label: "Подтверждён" },
  { value: "AWAITING_PAYMENT", label: "Ожидает оплаты" },
  { value: "PAID", label: "Оплачен" },
  { value: "COMPLETED", label: "Выполнен" },
  { value: "CANCELED", label: "Отменён" },
];

const OrderFilters = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const handleApplyFilters = () => {
    onFilter({
      start_date: startDate || undefined,
      end_date: endDate || undefined,
      status: status || undefined,
    });
  };

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    onFilter({});
  };

  return (
    <div className={styles.orderFilters}>
      <DateInput
        value={startDate}
        onChange={setStartDate}
        placeholder="Начало"
        label="Начало"
      />
      <DateInput
        value={endDate}
        onChange={setEndDate}
        placeholder="Конец"
        label="Конец"
      />
      <CustomSelect
        options={statusOptions}
        value={status}
        onChange={setStatus}
        placeholder="Все статусы"
      />
      <button onClick={handleApplyFilters} className={styles.orderFilters__button}>Применить</button>
      <button onClick={handleResetFilters} className={styles.orderFilters__delete}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default OrderFilters;
