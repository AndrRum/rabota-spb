import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router";
import "./Main.css"
import {SearchInputContainer} from "./children/SearchInputContainer";
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {NavigateButton} from "../../components/NavigateButton";
import {WallPostElement} from "./children/WallPostElement";
import {useLazyGetWallQuery, useLazySearchQuery} from "../../redux/vkApi";
import {Loader} from "../../components/Loader";
import {useDebounce} from "../../useDebounce";
import {Error} from "../error/Error";
import {EmptyResult} from "../emptyResult/EmptyResult";
import {ScrollToTop} from "./children/ScrollToTopButton";

export const Main = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [wall, setWall] = useState([])
    const listInnerRef = useRef();

    const debounced = useDebounce(searchValue);
    const [getWall, wallData] = useLazyGetWallQuery();
    const [search, searchData] = useLazySearchQuery();

    useEffect(() => {
        if (debounced.length > 3) {
            search({query: debounced, count: 100})
        } else if (!debounced) getWall({count: 20, offset})
    }, [debounced, offset])

    useEffect(() => {
        if (debounced.length > 3) {
            setWall(searchData?.data)
        } else setWall(wallData?.data);
    }, [debounced.length, searchData?.data, wallData?.data])

    const navigateToPrice = useCallback(() => {
        navigate("/price")
    }, [navigate])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = (event) => {
        console.log("e", event)
        setScrollTop(event.currentTarget.scrollTop);
    };

    console.log(scrollTop)


    const renderItem = wall?.response?.items?.map((el, index) => {
            return (
                <React.Fragment key={index + el.from_id}>
                    <WallPostElement post={el}/>
                </React.Fragment>)
        }
    );

    // console.log(wallData)

    return (
        <div className="Main">
            <Header/>
            {wallData.isError || wallData.isUninitialized
                ? <Error onPress={() => getWall({count: 100, offset})}/> :
                <>
                    <div className={"Input-button-container"}>
                        <SearchInputContainer
                            searchValue={searchValue}
                            searchInputHandler={searchInputHandler}
                        />
                        <NavigateButton
                            navigateToPrice={navigateToPrice}
                            title={"Рекламодателям"}
                        />
                    </div>
                    <div className={"container"}>
                        {wallData.status === "fulfilled"
                            && searchData.status === "fulfilled"
                            && !wall?.response?.items?.length && <EmptyResult/>}
                        {wallData.status === "pending"
                        || searchData.status === "pending"
                            ? <Loader/>
                            : <>{renderItem}</>}
                    </div>
                    <ScrollToTop/>
                    <Footer/>
                </>
            }
        </div>
    )
}