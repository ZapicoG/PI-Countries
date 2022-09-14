import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCountry } from "../Actions";
import "../css/CountryCard.css"


const CountryCard = (props) => {
    const dispatch = useDispatch();

    function setC () {
        dispatch(setCountry(props.id))
    }


    return (<div className="countryCard">
        <img src={props.imageUrl} alt={`${props.name} flag`}/>
        <div>
        <Link to={`${props.id}`} onClick={setC}>
            <p>{props.name}</p>
        </Link>
        <p>{props.continent}</p>
        </div>
    </div>)
}

export default CountryCard;