import React from 'react';

const widget = `
<style>
    h3 {
        padding: 30px;
        font-weight: 700;
        font-size: 30px;
        width: 50%;
        margin: 0 auto;
        font-family: 'TildaSans', Arial, sans-serif;
        color: #000;
        line-height: 1.17;
    }

    .tinkoffPayWidget {
        width: 50%;
        min-width: 20rem;
        max-width: 40rem;
        margin: 0 auto;
    }

    .tinkoffPayForm {
        padding: 1rem 0.5rem;
        background-color: white;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        
        @media (max-height: 525px) {
            padding: 0;
        }
    }

    .tinkoffPayRow {
        width: 100%;
        font-family: 'Helvetica Neue', sans-serif;
        box-sizing: border-box;
        transition: 0.3s;
        border: 1px solid #ecf1f7;
        border-radius: 4px;
        padding: 15px;
        margin: 5px;
        outline: none;
        background-color: #ecf1f7;
        resize: none;
        color: rgba(0, 0, 0, 0.664);
        font-size: 15px;
        
        @media (max-height: 525px) {
           margin: 1px;
        }
    }

    .tinkoffPayRow:focus {
        background-color: white;
        border: 1px solid #616871;
        border-radius: 4px;
    }

    .payBtn {
        width: 100%;
        border-radius: 5px;
        transition: 0.4s;
        border: 0;
        text-transform: uppercase;
        background-color: #ffdd2d;
        padding: 15px;
        cursor: pointer;
    }

    .payBtn:hover {
        background-color: #fcc521;
    }
</style>
<div class="tinkoffPayWidget">
    <form name="TinkoffPayForm" class="tinkoffPayForm" onsubmit="tinkoffPay(this); return false">
        <input class="tinkoffPayRow" type="hidden" name="terminalkey" value="1684231603937">
        <input class="tinkoffPayRow" type="hidden" name="frame" value="false">
        <input class="tinkoffPayRow" type="hidden" name="language" value="ru">
        <input class="tinkoffPayRow" type="hidden" placeholder="Номер заказа" name="order">
        <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" id="tinkoffAmount" name="amount"
               required>
        <input class="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description" required>
        <input class="tinkoffPayRow" type="hidden" placeholder="ФИО" name="name">
        <input class="tinkoffPayRow" type="text" placeholder="E-mail" id="tinkoffEmail" name="email" required>
        <input class="tinkoffPayRow" type="text" placeholder="Телефон" id="tinkoffPhone" name="phone">
        <input class="tinkoffPayRow" type="hidden" id="tinkoffReceipt" name="receipt" value=''>
        <input class="tinkoffPayRow payBtn" type="submit" value="Оплатить">
    </form>
</div>
`

export const PaymentForm = () => {
    return (
        <div dangerouslySetInnerHTML={{ __html: widget }} />
    )
}