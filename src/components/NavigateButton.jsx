import React from "react";
import "./NavigateButton.css"

export const NavigateButton = ({navigateToPrice, title}) => {
    return (
        <>
            <button
                className="button"
                role="button"
                onClick={navigateToPrice}
            >
                <p>{title}</p>
            </button>
        </>
    )
}