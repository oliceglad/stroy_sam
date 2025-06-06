import React, { useState, useEffect } from "react";
import NumberInput from "../../components/UI/NumberInput/numberInput";
import Button from "../../components/UI/Button/button";

const VerificationPage = () => {
  const phoneNumber = "+7 (999) 123-45-67";
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    alert("Код повторно отправлен");
  };

  const handleSubmit = () => {
    alert("Отправка кода: " + code);
    // сюда логика отправки
  };

  return (
    <div className="verification">
      <h2 className="verification__title">Вам отправлен код по смс</h2>
      <p className="verification__phone">На указанный номер: {phoneNumber}</p>

      <NumberInput length={6} onChange={setCode} />

      <div className="verification__resend">
        <span>Не пришло смс?</span>
        <button
          className={`verification__resend-btn ${canResend ? "active" : ""}`}
          onClick={handleResend}
          disabled={!canResend}
        >
          Повторить попытку
        </button>
        <span className="verification__timer">
          {timer > 0 ? `(${timer} сек)` : ""}
        </span>
      </div>

      <div className="verification__submit">
        <Button onClick={handleSubmit} disabled={code.length < 6}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default VerificationPage;
