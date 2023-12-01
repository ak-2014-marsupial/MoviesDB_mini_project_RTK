import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

import {UserInfo} from "../../UserInfo";
import {Switch} from "../Switch";
import css from "./Header.module.css"
import {Search} from "../Search";
import {useAppDispatch} from "../../../hooks";
import {movieActions} from "../../../redux/slices";

const Header = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();
const location = useLocation();
    console.log(location.pathname.split("/").pop());

    const handleClick=()=>{
    dispatch(movieActions.setFilter(null));
    navigate("/movies")
}
    return (
        <nav className={css.header}>
            <div className={css.col_1}>
                <div className={css.chevron} onClick={()=>navigate(-1)}>⬅</div>
                <div onClick={handleClick}>Movies</div>
                <Search/>
            </div>
            <div className={css.col_2}>
                <Switch/>
                <div className={css.avatar}>
                    <UserInfo/>
                </div>
            </div>

        </nav>
    );
};

export {Header};