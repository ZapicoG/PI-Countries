import React from "react";
import "../css/ActivityTag.css"


const ActivityTag = (props) => {

    return (<div className="ActivityTag">
        <img src={props.imageUrl} alt={`${props.name} flag`}/>
        <button className="tagClose" onClick={() => {props.deleteActivity(props.name)}}>X</button>
    </div>)
}

export default ActivityTag;