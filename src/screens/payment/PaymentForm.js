import React, {useEffect} from 'react';
import "./PaymentForm.css";

export const PaymentForm = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://securepay.tinkoff.ru/html/payForm/js/tinkoff_v2.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    };

    return (
        <div className="tinkoffPayWidget">
            <form name="TinkoffPayForm" className="tinkoffPayForm" onSubmit={(e) => {
                tinkoffPay(e.target)
                e.preventDefault()
            }}>
                <input className="tinkoffPayRow" type="hidden" name="terminalkey" value="1684231603937"/>
                <input className="tinkoffPayRow" type="hidden" name="frame" value="false"/>
                <input className="tinkoffPayRow" type="hidden" name="language" value="ru"/>
                <input className="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order"/>
                <input className="tinkoffPayRow" type="text" placeholder="Сумма заказа" id="tinkoffAmount" name="amount"
                       value="" required/>
                <input className="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description" required/>
                <input className="tinkoffPayRow" type="hidden" placeholder="ФИО" name="name"/>
                <input className="tinkoffPayRow" type="text" placeholder="E-mail" id="tinkoffEmail" name="email"
                       required/>
                <input className="tinkoffPayRow" type="text" placeholder="Телефон" id="tinkoffPhone"
                       name="phone"/>
                <input className="tinkoffPayRow" type="hidden" id="tinkoffReceipt" name="receipt" value=''/>
                <input className="tinkoffPayRow payBtn" type="submit" value="Оплатить"/>
            </form>
        </div>
    )
}