import React, { useState, useEffect, useMemo } from "react";
import Input from "../UI/Input/input";
import CustomSelect from "../UI/CustomSelect/CustomSelect";
import DateInput from "../UI/DateInput/DateInput";
import { useGetMeQuery } from "../../api/user";
import s from "./FormDelivery.module.scss";

const countryCityMap = {
  Россия: ["Москва", "Самара", "Санкт-Петербург"],
  Казахстан: ["Астана", "Алматы", "Шымкент"],
  Беларусь: ["Минск", "Гомель", "Брест"],
};

const FormDelivery = ({ onChange }) => {
  const { data: meData } = useGetMeQuery();

  const [formData, setFormData] = useState({
    country: "Россия",
    city: "Самара",
    address: "",
    recipient_name: "",
    phone_primary: "",
    phone_secondary: "",
    desired_delivery_at: "",
    extra_info: "",
  });

  useEffect(() => {
    if (meData) {
      const first = meData.first_name || "";
      const last = meData.last_name || "";
      setFormData((prev) => ({
        ...prev,
        recipient_name: `${first} ${last}`.trim(),
        phone_primary: `+7${meData.phone || ""}`,
        phone_secondary: `+7${prev.phone_secondary || ""}`,
      }));
    }
  }, [meData]);

  const cityOptions = useMemo(() => {
    return countryCityMap[formData.country] || [];
  }, [formData.country]);

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
    const value = e?.target ? e.target.value : e;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (value) => {
    let formatted = "";
    if (!value) formatted = "";
    else if (value instanceof Date)
      formatted = value.toISOString().split("T")[0];
    else formatted = value;
    setFormData((prev) => ({
      ...prev,
      desired_delivery_at: formatted,
    }));
  };

  return (
    <>
      <h1 className={s.formDelivery__title}>Укажите адрес доставки</h1>

      <div className={s.formDelivery__section}>
        <h3>Информация о заказчике</h3>
        <Input
          label="Получатель (ФИО)"
          placeholder="ФИО получателя"
          value={formData.recipient_name}
          onChange={handleInputChange("recipient_name")}
          name="recipient_name"
        />
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
          label="Основной номер"
          placeholder="Введите номер телефона"
          value={formData.phone_primary}
          onChange={handleInputChange("phone_primary")}
          name="phone_primary"
          maskType="phone"
        />

        <Input
          label="Доп. номер"
          placeholder="Доп. номер (необязательно)"
          value={formData.phone_secondary}
          onChange={handleInputChange("phone_secondary")}
          name="phone_secondary"
          maskType="phone"
        />

        <DateInput
          label="Желаемая дата доставки"
          value={formData.desired_delivery_at}
          onChange={handleDateChange}
          placeholder="Выберите дату"
          style={{ marginTop: "7px" }}
        />

        <Input
          label="Комментарий к доставке"
          placeholder="Например: код домофона, этаж и т.п."
          value={formData.extra_info}
          onChange={handleInputChange("extra_info")}
          name="extra_info"
        />
      </div>
    </>
  );
};

export default FormDelivery;
