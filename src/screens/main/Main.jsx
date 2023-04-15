import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import "./Main.css"
import {charCode} from "../../helpers/charCode";
import {SearchInputContainer} from "./children/SearchInputContainer";
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";
import {WallPostElement} from "./children/WallPostElement";
import {useLazyGetWallQuery, useLazySearchQuery} from "../../redux/vkApi";
import {Loader} from "../../components/Loader";
import {useDebounce} from "../../useDebounce";

export const Main = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [wall, setWall] = useState([])

    const debounced = useDebounce(searchValue);
    const [getWall, wallData] = useLazyGetWallQuery();
    const [search, searchData] = useLazySearchQuery();

    useEffect(() => {
        if (debounced.length > 3) {
            search({query: debounced, count: 100})
        } else if (!debounced) getWall({count: 100, offset})
    }, [debounced, offset])

    useEffect(() => {
        if (debounced.length > 3) {
            setWall(searchData?.data)
        } else setWall(wallData?.data);
    }, [debounced.length, searchData?.data, wallData?.data])

    console.log("wwwwwwwwwwwwwwwww", wall)
    console.log("sssssssssss", wallData.status, searchData.status);

    const navigateToPrice = useCallback(() => {
        navigate("/price")
    }, [navigate])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const handleKeypress = (e) => {
        if (e.charCode === charCode.enter) {
            setSearchValue("");
            e.target.blur();
        }
    }

    const renderItem = wall?.response?.items?.map((el, index) => {
            return (<React.Fragment key={index + el.from_id}><WallPostElement post={el}/></React.Fragment>)
        }
    );

    return (
        <div className="Main">
            <Header/>
            <div className={"Input-button-container"}>
                <SearchInputContainer
                    searchValue={searchValue}
                    searchInputHandler={searchInputHandler}
                    handleKeypress={handleKeypress}
                />
                <NavigateButton
                    navigateToPrice={navigateToPrice}
                    title={"Рекламодателям"}
                />
            </div>
            <div className={"container"}>
                {wallData.status === "pending" || searchData.status === "pending"
                    ? <Loader/>
                    : <>{renderItem}</>}
            </div>
            <Footer/>
        </div>
    )
}