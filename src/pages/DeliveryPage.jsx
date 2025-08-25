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
    try {
      await createOrder().unwrap();
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
