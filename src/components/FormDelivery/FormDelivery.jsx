import React, { useState, useEffect, useMemo } from "react";
import Input from "../UI/Input/input";
import CustomSelect from "../UI/CustomSelect/CustomSelect";
import DateInput from "../UI/DateInput/DateInput";
import s from "./FormDelivery.module.scss";

const countryCityMap = {
  Россия: ["Москва", "Самара", "Санкт-Петербург"],
  Казахстан: ["Астана", "Алматы", "Шымкент"],
  Беларусь: ["Минск", "Гомель", "Брест"],
};

const FormDelivery = ({ onChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "Россия",
    city: "Самара",
    address: "",
    phone: "",
    deliveryDate: "",
  });

  const cityOptions = useMemo(() => {
    return countryCityMap[formData.country] || [];
  }, [formData.country]);

  // Если выбранный город не принадлежит новой стране — сбросим на первый из списка
  useEffect(() => {
    if (!cityOptions.includes(formData.city)) {
      setFormData((prev) => ({
        ...prev,
        city: cityOptions[0] || "",
      }));
    }
  }, [formData.country, cityOptions]);

  useEffect(() => {
    onChange?.(formData);
  }, [formData, onChange]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      deliveryDate: value,
    }));
  };

  return (
    <>
      <h1 className={s.formDelivery__title}>Укажите адрес доставки</h1>

      <div className={s.formDelivery__section}>
        <h3>Информация о заказчике</h3>
        <Input
          label="E-mail"
          placeholder="Введите E-mail"
          value={formData.email}
          onChange={handleInputChange("email")}
          name="email"
          maskType="email"
        />
        <div className={s.formDelivery__name}>
          <Input
            label="Имя"
            placeholder="Введите имя"
            value={formData.firstName}
            onChange={handleInputChange("firstName")}
            name="firstName"
          />
          <Input
            label="Фамилия"
            placeholder="Введите фамилию"
            value={formData.lastName}
            onChange={handleInputChange("lastName")}
            name="lastName"
          />
        </div>
      </div>

      <div className={s.formDelivery__section}>
        <h3>Адрес</h3>

        <CustomSelect
          selectTitle="Страна"
          value={formData.country}
          onChange={handleSelectChange("country")}
          placeholder="Выберите страну"
          options={Object.keys(countryCityMap).map((country) => ({
            value: country,
            label: country,
          }))}
          classSelect={s.formDelivery__select}
          classSelected={s.formDelivery__selected}
        />

        <CustomSelect
          selectTitle="Город"
          value={formData.city}
          onChange={handleSelectChange("city")}
          placeholder="Выберите город"
          options={cityOptions.map((city) => ({
            value: city,
            label: city,
          }))}
          classSelect={s.formDelivery__select}
          classSelected={s.formDelivery__selected}
        />

        <Input
          label="Адрес"
          placeholder="Введите адрес"
          value={formData.address}
          onChange={handleInputChange("address")}
          name="address"
        />

        <Input
          label="Контактный номер"
          placeholder="Введите номер телефона"
          value={formData.phone}
          onChange={handleInputChange("phone")}
          name="phone"
          maskType="phone"
        />

        <DateInput
          label="Желаемая дата доставки"
          value={formData.deliveryDate}
          onChange={handleDateChange}
          placeholder="Выберите дату"
          style={{ marginTop: "7px" }}
        />
      </div>
    </>
  );
};

export default FormDelivery;
