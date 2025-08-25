import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NumberInput from "../../components/UI/NumberInput/numberInput";
import Button from "../../components/UI/Button/button";
import {
  useLoginUserMutation,
  useSmsVerificationMutation,
} from "../../api/user";

const VerificationPage = () => {
  const phone = sessionStorage.getItem("phone");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState("");
  const [login] = useLoginUserMutation();
  const [smsVerify, { isLoading }] = useSmsVerificationMutation();
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setCanResend(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const fetchCode = async () => {
      if (!phone) return;
      try {
        const response = await smsVerify({ phone }).unwrap();
        if (response?.status === "wait" && typeof response.time === "number") {
          setTimer(response.time);
          setCanResend(false);
        }
      } catch (err) {
        console.error("Ошибка при начальном refetch кода:", err);
      }
    };

    fetchCode();
  }, [phone, smsVerify]);

  const handleSubmit = async () => {
    try {
      await login({
        username: phone,
        password: code,
      }).unwrap();
      sessionStorage.removeItem("phone");
      navigate("/profile");
      window.location.reload();
    } catch (err) {
      console.error("Ошибка при входе:", err);
      alert("Неверный код. Попробуйте снова.");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const response = await smsVerify({ phone }).unwrap();
      if (response?.status === "wait" && typeof response.time === "number") {
        setTimer(response.time);
        setCanResend(false);
      } else {
        setTimer(30);
        setCanResend(false);
      }
      alert("Код повторно отправлен");
    } catch (err) {
      console.error("Ошибка при отправке СМС:", err);
      alert("Не удалось отправить код. Попробуйте позже.");
    }
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
          disabled={!canResend || isLoading}
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
