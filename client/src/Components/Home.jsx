import React from "react";
import { useSelector } from "react-redux";
import CountryCard from "./CountryCard";
import "../css/Home.css"






const Home = () => {
    let filtered = useSelector(state => state.filtered);

    return (
        <div className="countriesContainer">
            <h1>Countries</h1> 
        <div className="country">
        {filtered.map((c,i) =>
        <CountryCard key={`C${i}`}
            imageUrl={c.flag}
            name={c.name}
            continent={c.continent}
            id={c.ID}
         />)} 
        </div>
        </div>
    )


}

export default Home;

