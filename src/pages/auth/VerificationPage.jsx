import React, { useState, useEffect } from "react";
import NumberInput from "../../components/UI/NumberInput/numberInput";
import Button from "../../components/UI/Button/button";
import { useLoginUserMutation } from "../../api/user";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const phone = sessionStorage.getItem("phone");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState("");
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async () => {
    try {
      await login({
        username: phone,
        password: code,
      }).unwrap();
      sessionStorage.removeItem("phone");
      navigate("/categories");
    } catch (err) {
      console.error("Ошибка при входе:", err);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(30);
    setCanResend(false);
    // сюда можно снова вызвать useSmsVerificationMutation
    alert("Код повторно отправлен");
  };

  return (
    <div className="verification">
      <h2 className="verification__title">Вам отправлен код по СМС</h2>
      <p className="verification__phone">На указанный номер: {phone}</p>

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
