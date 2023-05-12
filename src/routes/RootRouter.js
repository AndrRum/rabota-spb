import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Main} from "../screens/main/Main";
import {Splash} from "../screens/splash/Splash";
import {Payment} from "../screens/payment/Payment";
import {Policy} from "../screens/policy/Policy";

export const RootRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/home" exact element={<Main/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/policy" element={<Policy/>}/>
            </Routes>
        </Router>
    )
}
