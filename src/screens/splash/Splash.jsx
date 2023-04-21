import React, {useEffect} from "react";
import {useNavigate} from "react-router";
import "./Splash.css"

export const Splash = () => {
    const navigate = useNavigate();
    // const token = useSelector(state => state.auth.accessToken);

    const test = async () => {
        const response = await fetch('http://localhost:5000/login/vk', {
            mode: "cors"
        });
        console.log(response.json())
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    }

    useEffect(() => {
        // dispatch(getAccessToken())
        // setTimeout(() => navigate("/home", {replace: true}), 2500);
        // window.location.replace(Domains.authUrl)
        //  test().then(r => console.log(r))
        test().then(r => console.log(r))
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