import React from 'react';
import { useNavigate } from "react-router";
import "./Payment.css";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { NavigateButton } from "../../components/NavigateButton";
import { PaymentForm } from "./PaymentForm";

export const Payment = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/home");
    };

    return (
        <div className="Payment">
            <Header />
            <div className={"Button"}>
                <NavigateButton
                    onClick={goBackHandler}
                    title={"На главную"}
                />
            </div>
            <PaymentForm />
            <div className="consent-text" style={{ maxWidth: 600, margin: "20px auto", fontSize: 14, textAlign: "center" }}>
                Нажимая на кнопку, вы даете согласие на обработку своих персональных данных, соглашаетесь с{" "}
                <a href="/policy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a> и{" "}
                <a href="/offer_agreement" target="_blank" rel="noopener noreferrer">договором-офертой</a>.
            </div>
            <Footer />
        </div>
    );
};
