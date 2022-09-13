import React from "react";

import "../css/CountryTag.css"


const CountryTag = (props) => {

    return (<div class="countryTag">
        <img src={props.imageUrl} alt={`${props.name} flag`}/>
        <button class="tagClose" onClick={() => {console.log(props.name);props.deleteCountry(props.name)}}>X</button>
    </div>)
}

export default CountryTag;