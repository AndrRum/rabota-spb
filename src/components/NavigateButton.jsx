import React from "react";
import "./NavigateButton.css"
import {Domains} from "../helpers/domains";

export const NavigateButton = ({title}) => {
    return (
        <a href={Domains.price} target={"_blank"} rel="noopener noreferrer" className={"hr"}>
            <button
                className="button"
            >
                <p>{title}</p>
            </button>
        </a>
    )
}