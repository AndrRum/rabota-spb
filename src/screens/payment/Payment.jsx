import React, {useState} from 'react';
import {useNavigate} from "react-router";
import "./Payment.css"
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";

export const Payment = () => {
    const navigate = useNavigate();
    const [orderDescription, setOrderDescription] = useState("Размещение вакансий");

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
            <div className={"Container"}>
                <script src="https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js"></script>
                <form name="TinkoffPayForm" onSubmit="pay(this); return false;">
                    <input className="tinkoffPayRow" type="hidden" name="terminalkey" value="TinkoffBankTest"/>
                    <input className="tinkoffPayRow" type="hidden" name="frame" value="true"/>
                    <input className="tinkoffPayRow" type="hidden" name="language" value="ru"/>
                    <input className="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount"
                           required/>
                    <input className="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order"/>
                    <input className="tinkoffPayRow"
                           value={orderDescription}
                           onChange={event => setOrderDescription(event.target.value)}
                           type="text"
                           placeholder="Описание заказа"
                           name="description"/>
                    <input className="tinkoffPayRow" type="text" placeholder="ФИО плательщика"
                           name="name"/>
                    <input className="tinkoffPayRow" type="text" placeholder="E-mail"
                           name="email"/>
                    <input className="tinkoffPayRow" type="text"
                           placeholder="Контактный телефон" name="phone"/>
                    <input className="tinkoffPayRow" type="submit" value="Оплатить"/>
                </form>
            </div>
            <Footer/>
        </div>
    )
}