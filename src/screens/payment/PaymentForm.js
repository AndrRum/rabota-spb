import React, {useRef} from 'react';
import "./PaymentForm.css";
import {usePayMutation} from "../../redux/paymentApi";

export const PaymentForm = () => {
    const formRef = useRef(null);
    const [pay, {isLoading}] = usePayMutation();

    const tinkoffPay = (form) => {
        let name = form.description.value;
        let amount = form.amount.value * 100;
        let email = form.email.value;
        let phone = form.phone.value;
        let quantity = 1;

        if (amount) {
            form.receipt.value = JSON.stringify({
                Email: email,
                Phone: phone,
                EmailCompany: 'test@tinkoff.ru',
                Taxation: 'usn_income',
                Items: [
                    {
                        Name: name,
                        Price: amount,
                        Quantity: quantity,
                        Amount: amount * quantity,
                        PaymentMethod: 'full_payment',
                        PaymentObject: 'service',
                        Tax: 'none',
                    },
                ],
            });
            payHelper(form);
        } else {
            alert('Не все обязательные поля заполнены');
        }
    };

    const payHelper = (form) => {
        // pay(form)
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    return (
        <div className="tinkoffPayWidget">
            <form
                ref={formRef}
                name="TinkoffPayForm"
                className="tinkoffPayForm"
                onSubmit={(e) => {
                    tinkoffPay(formRef.current);
                    e.preventDefault();
                }}
            >
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    name="terminalkey"
                    value="1684231603937"
                />
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    name="frame"
                    value="false"
                />
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    name="language"
                    value="ru"
                />
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    placeholder="Номер заказа"
                    name="order"
                />
                <input
                    className="tinkoffPayRow"
                    type="text"
                    placeholder="Сумма заказа"
                    id="tinkoffAmount"
                    name="amount"
                    required
                />
                <input
                    className="tinkoffPayRow"
                    type="text"
                    placeholder="Описание заказа"
                    name="description"
                    required
                />
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    placeholder="ФИО"
                    name="name"
                />
                <input
                    className="tinkoffPayRow"
                    type="text"
                    placeholder="E-mail"
                    id="tinkoffEmail"
                    name="email"
                    required
                />
                <input
                    className="tinkoffPayRow"
                    type="text"
                    placeholder="Телефон"
                    id="tinkoffPhone"
                    name="phone"
                />
                <input
                    className="tinkoffPayRow"
                    type="hidden"
                    id="tinkoffReceipt"
                    name="receipt"
                    value=""
                />
                <input className="tinkoffPayRow payBtn" type="submit" value="Оплатить"/>
            </form>
        </div>
    );
};