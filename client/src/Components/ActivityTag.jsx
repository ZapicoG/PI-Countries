import React from "react";
import "../css/ActivityTag.css"


const ActivityTag = (props) => {

    return (<div class="ActivityTag">
        <img src={props.imageUrl} alt={`${props.name} flag`}/>
        <button class="tagClose" onClick={() => {console.log(props.name);props.deleteActivity(props.name)}}>X</button>
    </div>)
}

export default ActivityTag;