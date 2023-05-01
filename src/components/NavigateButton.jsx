import React from "react";
import "./NavigateButton.css"
import {Domains} from "../helpers/domains";

export const NavigateButton = ({title, onClick}) => {
    return (
        <a href={Domains.price} target={"_blank"} rel="noopener noreferrer" className={"hr"}>
            <button
                className="button"
                onClick={onClick}
            >
                <p >{title}</p>
            </button>
        </a>
    )
}