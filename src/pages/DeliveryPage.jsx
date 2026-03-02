import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart/EmptyCart";
import InfoCart from "../components/Cart/InfoCart/InfoCart";
import FormDelivery from "../components/FormDelivery/FormDelivery";
import { useCreateOrderMutation } from "../api/orders";

const DeliveryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [formData, setFormData] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.recipient_name) newErrors.recipient_name = "Введите ФИО";
    if (!formData?.country) newErrors.country = "Выберите страну";
    if (!formData?.city) newErrors.city = "Выберите город";
    if (!formData?.address) newErrors.address = "Введите адрес";
    
    // Check if empty or incomplete (a full formatted number is approx 18 chars: "+7 (999) 999-99-99")
    if (!formData?.phone_primary || formData.phone_primary.length < 18) {
      newErrors.phone_primary = "Введите корректный номер";
    }
    
    if (!formData?.desired_delivery_at) {
      newErrors.desired_delivery_at = "Выберите дату доставки";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleCreateOrder = async () => {
    const normalizePhone = (phone) => {
      if (!phone) return "";
      return phone.replace(/\D/g, "").slice(0, 15);
    };

    const isValid = validateForm();
    setShowErrors(true);

    if (!isValid || !formData) {
      console.warn("Пожалуйста, заполните все обязательные поля корректно.");
      return;
    }

    const payload = {
      desired_delivery_at: formData.desired_delivery_at,
      country: formData.country,
      city: formData.city,
      address: formData.address,
      recipient_name: formData.recipient_name,
      phone_primary: normalizePhone(formData.phone_primary),
      phone_secondary: normalizePhone(formData.phone_secondary),
      extra_info: formData.extra_info,
    };

    try {
      console.log("Отправляем заказ:", payload);
      const res = await createOrder(payload).unwrap();
      const newOrderId = res?.id || res?.order_id || "";
      window.location.href = `/success${newOrderId ? `?order_id=${newOrderId}` : ""}`;
    } catch (error) {
      console.error("Ошибка при создании заказа", error);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="deliveryPage">
      <div className="deliveryPage__form">
        <FormDelivery
          onChange={handleFormChange}
          errors={errors}
          showErrors={showErrors}
        />
      </div>
      <InfoCart
        items={cartItems}
        onCreateOrder={handleCreateOrder}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DeliveryPage;
