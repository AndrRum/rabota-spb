import React, {useCallback, useEffect, useState} from 'react';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Main = () => {
    const navigate = useNavigate();
    const offsetAndCountInt = 20;

    const [searchValue, setSearchValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [wall, setWall] = useState();
    const [showPrevPage, setShowPrevPage] = useState(true);

    const debounced = useDebounce(searchValue);
    const [getWall, wallData] = useLazyGetWallQuery();
    const [search, searchData] = useLazySearchQuery();

    const handleScroll = useCallback(() => {
        const paginationCondition =
            (window.innerHeight + document.documentElement.scrollTop - document.body.offsetHeight) > 0;
        if (paginationCondition && debounced.length <= 3 && wallData.status !== "pending") {
            setOffset(prevState => prevState + offsetAndCountInt);
            getWall({count: offsetAndCountInt, offset})
        }
    }, [debounced.length, getWall, offset, wallData.status]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll]);

    useEffect(() => {
        if (debounced.length > 3) {
            search({query: debounced, count: offsetAndCountInt})
        } else if (!debounced) getWall({count: offsetAndCountInt, offset})
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

    const getPreviewPage = () => {
        setOffset(prevState => prevState - offsetAndCountInt);
    }

    const renderItem = wall?.response?.items?.map((el, index) => {
            return (
                <React.Fragment key={index + el.from_id}>
                    <WallPostElement post={el}/>
                </React.Fragment>)
        }
    );

    return (
        <div className="Main">
            <Header/>
            {wallData.isError || wallData.isUninitialized
                ? <Error onPress={() => getWall({count: offsetAndCountInt, offset: 0})}/> :
                <>
                    <div className={"Input-button-container"}>
                        <SearchInputContainer
                            searchValue={searchValue}
                            searchInputHandler={searchInputHandler}
                            onFocus={() => setShowPrevPage(false)}
                            onBlur={() => setShowPrevPage(true)}
                        />
                        {showPrevPage && offset > 0 && <ArrowBackIcon onClick={getPreviewPage} className={"arr-back"}/>}
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