import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ActivityCard from "./ActivityCard"
import "../css/CountryDetail.css"
import { useEffect } from 'react';
import { setCountry } from '../Actions';





const CountryDetail = () => {
  const dispatch = useDispatch();
  let country = useSelector((state) => state.country);
  const activities = useSelector(state => state.activities)
  console.log(country)   

  let path = useLocation();
  path = path.pathname;

  useEffect(() =>{
    dispatch(setCountry(path));
  },[activities])

  
  return (
    <section class="CountryDetail">
      <div class="CountrySpecs">
      <img src={country.flag} alt={`${country.name} flag`}/>
      <p>Nombre oficial: {country.name}</p>
      <p>Continente: {country.continent}</p>
      <p>ID: {country.ID}</p>
      <p>Capital: {country.capital}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Area: {country.area}Km²</p>
      <p>Poblacion: {country.population}</p>
      </div>
      <div class="ActivitiesSpecs">
      {country.activities?.map( c => (<ActivityCard 
      name={c.name}
      difficulty={c.difficulty}
      length={c.length}
      season={c.season}       
      />))}
      </div>
    </section>
  );
};

export default CountryDetail;
