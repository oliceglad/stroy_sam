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

  const handleFormChange = (updatedFormData) => {
    setFormData(updatedFormData);
  };

  const handleCreateOrder = async () => {
    const normalizePhone = (phone) => {
      if (!phone) return "";
      return phone.replace(/\D/g, "").slice(0, 15);
    };

    if (!formData) {
      console.warn("Form data is empty — заполните данные доставки.");
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
      await createOrder(payload).unwrap();
      navigate("/success");
      window.location.reload();
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
        <FormDelivery onChange={handleFormChange} />
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
