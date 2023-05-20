import React from "react";
import "./SearchInputContainer.css"
import SearchIcon from '@mui/icons-material/Search';

export const SearchInputContainer = (props) => {
    const {searchValue, searchInputHandler} = props;

    const onClick = () => {
        document.getElementById("input").focus();
    }

    return (
        <div className="search-box" onClick={onClick}>
            <button className="btn-search">
                <SearchIcon className={"search-icon"} />
            </button>
            <input
                type="text"
                id={"input"}
                className="input-search"
                placeholder="Поиск..."
                value={searchValue}
                onChange={searchInputHandler}
            />
        </div>
    )
}