import React from "react";
import "./NavigateButton.css"

export const NavigateButton = ({title, onClick}) => {
    return (
        <button
            className="button"
            onClick={onClick}
        >
            <p>{title}</p>
        </button>
    )
}