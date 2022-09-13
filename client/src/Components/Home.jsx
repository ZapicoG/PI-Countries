import React from "react";
import { useSelector } from "react-redux";
import CountryCard from "./CountryCard";
import "../css/Home.css"






const Home = () => {
    let filtered = useSelector(state => state.filtered);

    return (
        <div class="countriesContainer">
            <h1>Countries</h1> 
        <div class="country">
        {filtered.map(c =>
        <CountryCard 
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

