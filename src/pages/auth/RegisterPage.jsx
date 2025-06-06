import React, { useState } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";

const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    alert(`Регистрация: ${JSON.stringify(form, null, 2)}`);
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
        placeholder="Номер телефона"
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
    </div>
  );
};

export default RegisterPage;
