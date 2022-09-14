import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Pagination = (props) => {
    const filter = useSelector(state => state.filter)

    useEffect(() =>{
        
    },[filter])
    return (
        <select>
            {console.log(1,props)}
            {props.maxPages.map(e => <option value={e}>{e}</option>)}
        </select>
    )
}

export default Pagination;