import React from "react"
import "./Loader.css"

export const Loader = () => {
    return (
        <div className={"body"}>
            <h1 className="title">Loading ...</h1>
            <div className="rainbow-marker-loader" />
        </div>
    )
}