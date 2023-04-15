import React from "react";
import "./EmptyResult.css"
import SearchIcon from '@mui/icons-material/Search';

export const EmptyResult = () => {
    return (
        <div className={"no-res-container"}>
            <SearchIcon className={"no-res-img"}/>
            <h2 className={"no-res-lbl"}>Поиск не дал результатов</h2>
        </div>
    )
}