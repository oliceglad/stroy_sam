import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  const [consentChecked, setConsentChecked] = useState(false);
  const [showConsentError, setShowConsentError] = useState(false);

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
    if (!consentChecked) {
      setShowConsentError(true);
      return;
    }
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
      
      <div className="auth__consent">
        <label className="auth__consentLabel" style={{display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '13px', lineHeight: '1.4', cursor: 'pointer', textAlign: 'left'}}>
          <input 
            type="checkbox" 
            checked={consentChecked} 
            onChange={(e) => {
              setConsentChecked(e.target.checked);
              setShowConsentError(false);
            }} 
            style={{marginTop: '2px'}}
          />
          <span style={{color: '#555'}}>
            Я даю <Link to="/personal-data-consent" style={{color: '#007bff', textDecoration: 'underline'}}>согласие на обработку персональных данных</Link> и подтверждаю ознакомление с <Link to="/data-policy" style={{color: '#007bff', textDecoration: 'underline'}}>Политикой обработки персональных данных</Link>
          </span>
        </label>
        {showConsentError && <div className="auth__consentError" style={{color: 'red', fontSize: '13px', marginTop: '5px', textAlign: 'left'}}>Необходимо подтвердить согласие с Политикой</div>}
      </div>

      <Button onClick={handleSubmit} style={{ marginTop: "15px" }}>Зарегистрироваться</Button>

      <Link to="/login" className="auth__link">
        Уже есть аккаунт? Войти
      </Link>

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
