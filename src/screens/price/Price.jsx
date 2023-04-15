import React from 'react';
import {useNavigate} from "react-router";
import "./Price.css"
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";

export const Price = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/home")
    }

    return (
        <div className="Price">
            <Header/>
            <div className={"Button"}>
                <NavigateButton
                    navigateToPrice={goBackHandler}
                    title={"На главную"}
                />
            </div>
            <div className="Container">
                <div className="Container__body">
                    <h4>Прайс</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
            <Footer/>
        </div>
    )
}