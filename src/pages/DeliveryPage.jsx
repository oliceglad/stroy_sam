import React, { useState } from "react";
import Input from "../components/UI/Input/input";
import InfoCart from "../components/Cart/InfoCart/InfoCart";

const DeliveryPage = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "Россия",
    city: "Самара",
    phone: "",
    deliveryDate: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="deliveryPage">
      <div className="deliveryPage__form">
        <h1 className="deliveryPage__title">Укажите адрес доставки</h1>
        <div className="deliveryPage__section">
          <h3>Информация о заказчике</h3>
          <Input
            label="E-mail"
            placeholder="Введите E-mail"
            value={formData.email}
            onChange={handleInputChange("email")}
            name="email"
          />
          <div className="deliveryPage__name">
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
        <div className="deliveryPage__section">
          <h3>Адрес</h3>
          <Input
            label="Страна"
            placeholder="Выберите страну"
            value={formData.country}
            onChange={handleInputChange("country")}
            name="country"
            inputProps={{ list: "country-list" }}
          />
          <datalist id="country-list">
            <option value="Россия" />
            <option value="Казахстан" />
            <option value="Беларусь" />
          </datalist>
          <Input
            label="Город"
            placeholder="Выберите город"
            value={formData.city}
            onChange={handleInputChange("city")}
            name="city"
            inputProps={{ list: "city-list" }}
          />
          <datalist id="city-list">
            <option value="Самара" />
            <option value="Москва" />
            <option value="Питер" />
          </datalist>
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
          <Input
            label="Желаемая дата доставки"
            placeholder="Выберите дату"
            value={formData.deliveryDate}
            onChange={handleInputChange("deliveryDate")}
            name="deliveryDate"
            inputProps={{ type: "date" }}
          />
        </div>
      </div>

      <div className="deliveryPage__infoCart">
        <InfoCart items={cartItems} />
      </div>
    </div>
  );
};

export default DeliveryPage;
