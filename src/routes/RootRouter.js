import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Main} from "../screens/main/Main";
import {Splash} from "../screens/splash/Splash";
import {Payment} from "../screens/payment/Payment";

export const RootRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/home" exact element={<Main/>}/>
                <Route path="/Payment" element={<Payment/>}/>
            </Routes>
        </Router>
    )
}
