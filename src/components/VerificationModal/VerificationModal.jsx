import React, { useState, useEffect, useRef } from "react";
import NumberInput from "../UI/NumberInput/numberInput";
import Button from "../UI/Button/button";
import {
  useLoginUserMutation,
  useSmsVerificationMutation,
} from "../../api/user";
import s from "./VerificationModal.module.scss";
import { useNavigate } from "react-router-dom";

const VerificationModal = ({ phone, onClose }) => {
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [code, setCode] = useState("");
  const [login] = useLoginUserMutation();
  const [smsVerify, { isLoading }] = useSmsVerificationMutation();
  const intervalRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

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
      onClose();
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

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div className={s.modal} ref={modalRef}>
        <button className={s.modal__close} onClick={onClose}>
          ×
        </button>
        <h2 className={s.modal__title}>Вам отправлен код по СМС</h2>
        <span className={s.modal__phone}>На номер: {phone}</span>

        <NumberInput length={6} onChange={setCode} />

        <div className={s.modal__resend}>
          <span>Не пришло смс?</span>
          <button
            className={
              canResend
                ? `${s.modal__resend__btn} ${s.active}`
                : s.modal__resend__btn
            }
            onClick={handleResend}
            disabled={!canResend || isLoading}
          >
            Повторить попытку
          </button>
          <span className={s.modal__resend__timer}>
            {timer > 0 ? `(${timer} сек)` : ""}
          </span>
        </div>

        <Button onClick={handleSubmit} disabled={code.length < 6}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default VerificationModal;
