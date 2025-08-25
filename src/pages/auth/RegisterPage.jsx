import React, { useState } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";
import {
  useRegisterUserMutation,
  useSmsVerificationMutation,
} from "../../api/user";
import VerificationModal from "../../components/VerificationModal/VerificationModal";

const RegisterPage = () => {
  const [register] = useRegisterUserMutation();
  const [smsVerify] = useSmsVerificationMutation();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [phoneForVerification, setPhoneForVerification] = useState("");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const cleanPhone = (maskedPhone) => {
    const digits = maskedPhone.replace(/\D/g, "");
    return digits.startsWith("7") || digits.startsWith("8")
      ? digits.slice(1)
      : digits;
  };

  const handleSubmit = async () => {
    const purePhone = cleanPhone(form.phone);
    try {
      await register({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: purePhone,
        email: form.email,
      }).unwrap();

      await smsVerify({ phone: purePhone }).unwrap();
      sessionStorage.setItem("phone", purePhone);
      setPhoneForVerification(purePhone);
      setIsVerificationOpen(true); // открываем модалку
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      alert("Не удалось зарегистрироваться. Проверьте данные.");
    }
  };

  const handleCloseModal = () => {
    setIsVerificationOpen(false);
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <Input
        label="Имя"
        placeholder="Имя"
        value={form.firstName}
        onChange={handleChange("firstName")}
        style={{ marginBottom: "20px" }}
      />
      <Input
        label="Фамилия"
        placeholder="Фамилия"
        value={form.lastName}
        onChange={handleChange("lastName")}
        style={{ marginBottom: "20px" }}
      />
      <Input
        label="Номер телефона"
        placeholder="+7 (___) ___-__-__"
        value={form.phone}
        onChange={handleChange("phone")}
        maskType="phone"
        style={{ marginBottom: "20px" }}
      />
      <Input
        label="Почта"
        placeholder="Почта"
        value={form.email}
        onChange={handleChange("email")}
        maskType="email"
        style={{ marginBottom: "20px" }}
      />
      <Button onClick={handleSubmit}>Зарегистрироваться</Button>

      {isVerificationOpen && (
        <VerificationModal
          phone={phoneForVerification}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default RegisterPage;
