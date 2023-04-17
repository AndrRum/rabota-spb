import React from "react";
import "./SearchInputContainer.css"
import SearchIcon from '@mui/icons-material/Search';

export const SearchInputContainer = (props) => {
    const {searchValue, searchInputHandler,onFocus, onBlur} = props;
    return (
        <div className="search-box">
            <button className="btn-search" onFocus={onFocus}  onBlur={onBlur}>
                <SearchIcon className={"search-icon"}/>
            </button>
            <input
                type="text"
                className="input-search"
                placeholder="Поиск..."
                value={searchValue}
                onChange={searchInputHandler}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </div>
    )
}