import React from 'react';
import {useNavigate} from "react-router";
import "./Payment.css"
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";

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
            <div className="Container">

            </div>
            <Footer/>
        </div>
    )
}