import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import { useSmsVerificationMutation } from "../../api/user";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [smsVerify] = useSmsVerificationMutation();
  const navigate = useNavigate();

  const cleanPhone = (maskedPhone) => {
    const digits = maskedPhone.replace(/\D/g, "");
    return digits.startsWith("7") || digits.startsWith("8")
      ? digits.slice(1)
      : digits;
  };

  const handleSubmit = async () => {
    const purePhone = cleanPhone(phone);
    try {
      console.log({ phone: purePhone })
      await smsVerify({ phone: purePhone }).unwrap();
      sessionStorage.setItem("phone", purePhone);
      navigate("/verification");
    } catch (err) {
      console.error("Ошибка при отправке СМС:", err);
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Авторизация</h1>
      <Input
        label="Номер телефона"
        placeholder="+7 (___) ___-__-__"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maskType="phone"
      />
      <div style={{ height: 20 }} />
      <Button onClick={handleSubmit}>Войти</Button>
    </div>
  );
};

export default LoginPage;
