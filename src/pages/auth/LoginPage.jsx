import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import { useSmsVerificationMutation } from "../../api/user";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [smsVerify] = useSmsVerificationMutation();
  const navigate = useNavigate();

  const formatPhone = (digits) => {
    if (!digits) return "";
    const str = digits.slice(0, 10); 
    let formatted = "+7 ";
    if (str.length > 0) formatted += "(" + str.slice(0, 3);
    if (str.length >= 4) formatted += ") " + str.slice(3, 6);
    if (str.length >= 7) formatted += "-" + str.slice(6, 8);
    if (str.length >= 9) formatted += "-" + str.slice(8, 10);
    return formatted;
  };

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const cleaned = digits.startsWith("7") || digits.startsWith("8")
      ? digits.slice(1)
      : digits;
    setPhone(cleaned);
  };

  const handleSubmit = async () => {
    try {
      await smsVerify({ phone }).unwrap();
      sessionStorage.setItem("phone", phone);
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
        value={formatPhone(phone)}
        onChange={handleChange}
      />
      <div style={{ height: 20 }} />
      <Button onClick={handleSubmit} disabled={phone.length < 10}>
        Войти
      </Button>
    </div>
  );
};

export default LoginPage;
