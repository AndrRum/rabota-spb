import React, {useCallback, useEffect, useMemo, useState} from 'react';
import "./Main.css"
import {SearchInputContainer} from "./children/SearchInputContainer";
import {Header} from "../../components/Header";
import {Footer} from "../../components/Footer";
import {WallPostElement} from "./children/WallPostElement";
import {useLazyGetWallQuery, useLazySearchQuery, vkApi} from "../../redux/vkApi";
import {Loader} from "../../components/Loader";
import {useDebounce} from "../../useDebounce";
import {Error} from "../error/Error";
import {EmptyResult} from "../emptyResult/EmptyResult";
import {ScrollToTop} from "./children/ScrollToTopButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
    const [open, setOpen] = useState(false);

    const debounced = useDebounce(searchValue.trim());
    const [getWall, wallData] = useLazyGetWallQuery();
    const [search, searchData] = useLazySearchQuery();

    const data = useMemo(() => searchValue.length > 3 ? searchData.data : wallData.data, [searchData.data, searchValue.length, wallData.data])

    useEffect(() => {
        if (debounced.length > 3) {
            search({query: debounced, count: offsetAndCountInt, token: token?.access_token})
        } else if (!debounced) {
            console.log("off", offset, wallData.status)
            dispatch(vkApi.util.resetApiState())
            getWall({count: offsetAndCountInt, offset, token: token?.access_token})
        }
    }, [debounced, offset, token])

    useEffect(() => {
        if (!token || token?.error || wallData.data?.error?.error_code === 5) {
            dispatch(clearToken())
            navigate("/", {replace: true})
        }
    }, [dispatch, navigate, token, wallData?.data?.error?.error_code])

    const searchInputHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const getPreviewPage = () => {
        setOffset(prevState => prevState - offsetAndCountInt);
    }

    const getNextPage = () => {
        setOffset(prevState => prevState + offsetAndCountInt);
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

    const renderItem = data?.response?.items?.map((el, index) => {
            return (
                <React.Fragment key={index + el.from_id}>
                    <WallPostElement post={el}/>
                </React.Fragment>)
        }
    );

    const renderContent = useCallback(() => {
        return searchValue.length > 0
            ? renderHelper(searchData.status)
            : renderHelper(wallData.status)
    }, [searchData.status, searchValue.length, wallData.status])

    const renderHelper = useCallback((status) => {
        if (isFulfilled(status)) {
            return (!data?.response?.items?.length
                    ? <EmptyResult/>
                    : <>{renderItem}</>
            )
        } else if (isPending(status)) {
            return <Loader/>
        }
    }, [renderItem, data])

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
                    {!isPending(wallData.status)
                        && debounced.length === 0
                        && <div className={"paginationButtons"}>
                            <button className={"pagBut"} onClick={getPreviewPage}>
                                {offset > 0 &&
                                    <>
                                        <ArrowBackIosIcon/>
                                        <h5>Назад</h5>
                                    </>}
                            </button>
                            <button className={"pagBut"} onClick={getNextPage}>
                                <h5>Вперед</h5>
                                <ArrowForwardIosIcon/>
                            </button>
                        </div>}
                    <ScrollToTop/>
                    <div className={"empty"}/>
                    <Footer/>
                </>
            }
        </div>
    )
}