import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router";
import "./Main.css"
import {charCode} from "../../helpers/charCode";
import {SearchInputContainer} from "./children/SearchInputContainer";
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";
import {WallPostElement} from "./children/WallPostElement";
import {useLazyGetWallQuery} from "../../redux/vkApi";
import {Loader} from "../../components/Loader";

export const Main = () => {
    const [getWall, wallData] = useLazyGetWallQuery();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [offset, setOffset] = useState(0);

    const listRef = useRef();

    useEffect(() => {
        getWall({count: 100, offset})
    }, [getWall, offset])

    // console.log("data", wallData)

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

    const renderItem = wallData?.data?.response?.items?.map((el, index) => {
        return (<React.Fragment key={index}><WallPostElement post={el}/></React.Fragment>)
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
                {wallData.status === "pending" ? <Loader/> : <>{renderItem}</>}
            </div>
            <Footer/>
        </div>
    )
}