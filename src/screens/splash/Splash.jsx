import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import "./Splash.css"
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../redux/auth/authThunk";

export const Splash = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.accessToken);
    console.warn(token);

    useEffect(() => {
        dispatch(getAccessToken())
        // setTimeout(() => navigate("/home", {replace: true}), 2500);
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