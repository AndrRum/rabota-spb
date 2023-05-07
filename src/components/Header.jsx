import React from "react";
import Carousel from 'react-material-ui-carousel'
import "./Header.css"

export const Header = ({onClick}) => {
    return (
        <Carousel
            className={"Carousel"}
            autoPlay
            swipe
            fullHeightHover
            animation={"slide"}
            indicators={false}
            interval={10000}
            duration={2000}
        >
            {
                [0, 1].map((item, i) => <Item key={item} onClick={onClick}/>)
            }
        </Carousel>
    )
}

function Item({onClick}) {
    return (
        <div className={"ImgContainer"} onClick={onClick}>
            <img src={require("../resources/logo.jpeg")} alt="logo" className={"Img"}/>
        </div>

    )
}