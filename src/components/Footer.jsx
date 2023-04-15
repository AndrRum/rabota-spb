import React from "react";
import TelegramIcon from '@mui/icons-material/Telegram';
import "./Footer.css"
import {Icon24LogoVk} from "@vkontakte/icons";
import {Domains} from "../helpers/domains";

export const Footer = () => {
    const date = "2014-".concat(`${new Date().getFullYear()}`);

    return (
        <div className={"Footer"}>
            <p className={"Info"}>
                © Все права защищены. "Работа СПб", {date} гг.
                <br/>
                И.п. Ольга Афонская.
            </p>
            <div className={"Logo-container"}>
                <div
                    className={"Telegram-container"}
                >
                    <a
                        target="_blank"
                        className={"Href-style"}
                        rel="noreferrer"
                        href={Domains.telegram}>
                        <TelegramIcon className={"Telegram-logo"} width={24} height={24}/>
                    </a>
                </div>
                <div
                    className={"Vk-container"}
                >
                    <a
                        target="_blank"
                        className={"Href-style"}
                        rel="noreferrer"
                        href={Domains.vk}>
                        <Icon24LogoVk className={"Vk-logo"} width={24} height={24}/>
                    </a>
                </div>
            </div>
        </div>
    )
}