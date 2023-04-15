import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import "./Splash.css"

export const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
      setTimeout(() => navigate("/home", {replace: true}), 2500);
    }, [navigate])

    return (
        <div className="Splash">
            <header className="Splash-header">
                <img
                    src={require("../../resources/logo.jpeg")}
                    className="Splash-logo"
                    alt="logo"
                />
            </header>
        </div>
    )
}