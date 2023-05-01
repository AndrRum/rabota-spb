import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import "./Splash.css"
import {Domains} from "../../helpers/domains";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../redux/auth/authThunk";

export const Splash = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.accessToken.access_token);
    const currentPage = window.location;

    useEffect(() => {
        if (token) {
            setTimeout(() => navigate("/home", {replace: true}), 2500);
        } else {
            currentPage.search
                ? dispatch(getAccessToken(currentPage.search.substring(6)))
                : currentPage.replace(Domains.authUrl)

        }
    }, [dispatch, navigate, token])

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