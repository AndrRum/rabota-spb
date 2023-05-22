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
        <div class="tinkoffPayWidget">
            <form name="TinkoffPayForm" class="tinkoffPayForm" onSubmit={(e) => {
                tinkoffPay(e.target)
                e.preventDefault()
            }}>
                <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1684231603937"/>
                <input class="tinkoffPayRow" type="hidden" name="frame" value="false"/>
                <input class="tinkoffPayRow" type="hidden" name="language" value="ru"/>
                <input class="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order"/>
                <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" id="tinkoffAmount" name="amount"
                       value="" required/>
                <input class="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description" required/>
                <input class="tinkoffPayRow" type="hidden" placeholder="ФИО" name="name"/>
                <input class="tinkoffPayRow" type="text" placeholder="E-mail" id="tinkoffEmail" name="email"
                       required/>
                <input class="tinkoffPayRow" type="text" placeholder="Телефон" id="tinkoffPhone"
                       name="phone"/>
                <input class="tinkoffPayRow" type="hidden" id="tinkoffReceipt" name="receipt" value=''/>
                <input class="tinkoffPayRow payBtn" type="submit" value="Оплатить"/>
            </form>
        </div>
    )
}