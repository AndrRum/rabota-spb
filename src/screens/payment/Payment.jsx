import React from 'react';
import {useNavigate} from "react-router";
import "./Payment.css"
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";
import {PaymentForm} from "./PaymentForm";

export const Payment = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/home")
    }

    return (
        <div className="Payment">
            <Header/>
            <div className={"Button"}>
                <NavigateButton
                    onClick={goBackHandler}
                    title={"На главную"}
                />
            </div>
            <PaymentForm/>
            <Footer/>
        </div>
    )
}