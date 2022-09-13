import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities, getCountries, getCountry, setCountry } from "../Actions";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import CreateActivity from "./CreateActivity";
import "../css/NavBar.css"





const Nav = () => {
    const dispatch = useDispatch();
    let path = useLocation();
    path = path.pathname;


    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
        if (path != "/home") {

            try {
                dispatch(setCountry(path.slice(1)))
            } catch (e) {console.log(e)}
        }
        }, [])
 

    if (path === "/") return null
    return (
        <div class="navBar">
        {path != "/home" ? <Link to={"/home"}><button id="home">Home</button></Link> : null}
        {path === "/home"? <SearchBar></SearchBar> : null}
        <CreateActivity/>
        </div>
    )


}

export default Nav;