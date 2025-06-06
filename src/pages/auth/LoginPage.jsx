import React, { useState } from "react";
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/button";

const LoginPage = () => {
  const [phone, setPhone] = useState("");

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
      <Button onClick={() => alert(`Phone: ${phone}`)}>Войти</Button>
    </div>
  );
};

export default LoginPage;
