import React, {useCallback, useEffect, useState} from 'react';
import "./Main.css"
import {SearchInputContainer} from "./children/SearchInputContainer";
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {WallPostElement} from "./children/WallPostElement";
import {useLazyGetWallQuery, useLazySearchQuery} from "../../redux/vkApi";
import {Loader} from "../../components/Loader";
import {useDebounce} from "../../useDebounce";
import {Error} from "../error/Error";
import {EmptyResult} from "../emptyResult/EmptyResult";
import {ScrollToTop} from "./children/ScrollToTopButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {clearToken} from "../../redux/auth/authSlice";
import {DrawerComponent} from "../drawer/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Domains} from "../../helpers/domains";

export const Main = () => {
    const navigate = useNavigate();
    const offsetAndCountInt = 20;
    const dispatch = useDispatch();

    const token = useSelector(state => state.auth.accessToken);

    const [searchValue, setSearchValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [wall, setWall] = useState();
    const [open, setOpen] = useState(false);

    const debounced = useDebounce(searchValue.trim());
    const [getWall, wallData] = useLazyGetWallQuery();
    const [search, searchData] = useLazySearchQuery();

    const handleScroll = useCallback(() => {
        const paginationCondition =
            (window.innerHeight + document.documentElement.scrollTop - document.body.offsetHeight) > 0;
        if (paginationCondition && debounced.length <= 3 && wallData.status !== "pending") {
            setOffset(prevState => prevState + offsetAndCountInt);
            getWall({count: offsetAndCountInt, offset, token: token?.access_token})
        }
    }, [debounced.length, getWall, offset, token, wallData.status]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [handleScroll]);

    useEffect(() => {
        if (debounced.length > 3) {
            search({query: debounced, count: offsetAndCountInt, token: token?.access_token})
        } else if (!debounced) getWall({count: offsetAndCountInt, offset, token: token?.access_token})
    }, [debounced, getWall, offset, search, token])

    useEffect(() => {
        if (debounced.length > 3) {
            setWall(searchData?.data)
        } else setWall(wallData?.data);
    }, [debounced.length, searchData?.data, wallData?.data])

    useEffect(() => {
        if (!token || token?.error || wall?.error?.error_code === 5) {
            dispatch(clearToken())
            navigate("/", {replace: true})
        }
    }, [dispatch, navigate, token, wall?.error?.error_code])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const getPreviewPage = () => {
        setOffset(prevState => prevState - offsetAndCountInt);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClickDrawerItemHandler = (index) => {
        if (index % 2 === 0) {
            window.open(Domains.Payment, '_blank', 'noreferrer')
        } else if (index === -1) {
            navigate("/policy")
        } else {
            navigate("/payment")
        }
        handleDrawerClose()
    }

    const renderItem = wall?.response?.items?.map((el, index) => {
            return (
                <React.Fragment key={index + el.from_id}>
                    <WallPostElement post={el}/>
                </React.Fragment>)
        }
    );

    const renderContent = () => {
        return searchValue.length > 0
            ? renderHelper(searchData.status)
            : renderHelper(wallData.status)
    }

    const renderHelper = (status) => {
        if (isFulfilled(status)) {
            return !wall?.response?.items?.length
                ? <EmptyResult/>
                : <>{renderItem}</>
        } else if (isPending(status)) {
            return <Loader/>
        }
    }

    const isFulfilled = (status) => {
        return status === "fulfilled";
    }

    const isPending = (status) => {
        return status === "pending";
    }

    return (
        <div className="Main">
            <Header onClick={() => setSearchValue("")}/>
            {wallData.isError
                ? <Error onPress={() => getWall({count: offsetAndCountInt, offset: 0, token: token?.access_token})}/> :
                <>
                    <div className={"Input-button-container"}>
                        <SearchInputContainer
                            searchValue={searchValue}
                            searchInputHandler={searchInputHandler}
                        />
                        {offset > 0
                            && debounced.length <= 3
                            && <ArrowBackIcon onClick={getPreviewPage} className={"arr-back"}/>}
                        <IconButton
                            onClick={handleDrawerOpen}
                            className={"drawer"}
                            style={{position: "absolute", right: 12}}
                            sx={{...(open && {display: 'none'})}}
                        >
                            <MenuIcon className={"drawer_btn"}/>
                        </IconButton>
                        <DrawerComponent
                            open={open}
                            handleDrawerClose={handleDrawerClose}
                            onClick={onClickDrawerItemHandler}
                        />
                    </div>
                    <div className={"container"}>
                        {renderContent()}
                    </div>
                    <ScrollToTop/>
                    <div className={"empty"}/>
                    <Footer/>
                </>
            }
        </div>
    )
}