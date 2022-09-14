import React from "react";

import "../css/CountryTag.css"


const CountryTag = (props) => {

    return (<div className="countryTag">
        <img src={props.imageUrl} alt={`${props.name} flag`}/>
        <button className="tagClose" onClick={() => {console.log(props.name);props.deleteCountry(props.name)}}>X</button>
    </div>)
}

export default CountryTag;