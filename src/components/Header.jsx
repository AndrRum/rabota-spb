import React from "react";
import Carousel from 'react-material-ui-carousel'
import "./Header.css"

export const Header = () => {
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
                [0, 1].map((item, i) => <Item key={item} item={item}/>)
            }
        </Carousel>
    )
}

function Item(props) {
    return (
        <div className={"ImgContainer"}>
            {props.item === 0
                ? <img src={require("../resources/logo.jpeg")} alt="logo" className={"Img"}/>
                : <img src={require("../resources/logo2.jpeg")} alt="logo2" className={"Img2"}/>
            }
        </div>

    )
}