import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Main} from "../screens/main/Main";
import {Splash} from "../screens/splash/Splash";

export const RootRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Splash/>}/>
                <Route path="/home" exact element={<Main/>}/>
                {/*<Route path="/price" element={<Price/>}/>*/}
            </Routes>
        </Router>
    )
}
