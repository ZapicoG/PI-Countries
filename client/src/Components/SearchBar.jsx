import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, changeFiltered } from "../Actions";



const SearchBar = () => {
    const dispatch = useDispatch();


    const countries = useSelector(state => state.countries);
    const activities = useSelector(state => state.activities);
    let filtered = useSelector(state => state.filtered);
    let filter = useSelector(state => state.filter);

    let PAGINADO = 9;

    const blankFilter = {
        name: "",
        continent: "",
        activity: "",
        order: "",
        page: "0"
    }
    let [maxPages, setMaxPages ] = useState([])


    useEffect(() =>{
        filterCountries();
    },[countries, filter])

    function handleClick (e) {
        // e.preventDefault(); 
        dispatch(changeFilter(blankFilter))
    }

    function handleChange (e) {
        if (e.target.name == "page") {
            filter = {...filter, [e.target.name]: e.target.value};
            dispatch(changeFilter(filter))
        } else {
            filter = {...filter, [e.target.name]: e.target.value, page: "0"}
            dispatch(changeFilter(filter))
        }
        // console.log(filtered)
    }


    function filterCountries () {
        let continent = filter.continent;
        let activity = filter.activity;
        filtered = countries.filter( c => 
            c.name.toLowerCase().includes(filter.name.toLowerCase())
            && (continent ? c.continent === continent : true)
            && (activity ? c.activities.some(e => e.name === activity) : true)
        );
        let order = filter.order;
        filtered.sort((a, b) => {
            order = filter.order
            let ans = 0;
            switch (order) {
                case "":
                    ans = a.name > b.name ? 1 : (a.name < b.name ? -1 : 0)
                    break;
                case "AlphabetDES":
                    ans = a.name < b.name ? 1 : (a.name > b.name ? -1 : 0)
                    break;
                case "PopulationASC":
                    ans = a.population - b.population; 
                    break;
                case "PopulationDES":
                    ans = b.population - a.population; 
                    break;            
                default:
                    break;
                }
            return ans

        });
        setMaxPages([...Array(Math.ceil(filtered.length / 9)).keys()]);
        let page = filter.page;


        // Cambiar el paginado despues de la primer pagina

        // if (page > 0) PAGINADO = 10;
        filtered = filtered.slice( 0 + page * PAGINADO , (parseInt(page) + 1) * PAGINADO)

        return dispatch(changeFiltered(filtered))
    }

    
    return (
        <div class="searchBar">
        <input
        type="text"
        name="name"
        placeholder="Buscar por nombre"
        value={filter.name ? filter.name : ""}
        onChange={handleChange}
        />
        <select
        name="continent"
        onChange={handleChange}
        value={filter.continent ? filter.continent : ""}
        >
            <option value="">Continente</option>
            <option value="Oceania">Oceania</option>
            <option value="North America">America del norte</option>
            <option value="Europe">Europa</option>
            <option value="Asia">Asia</option>
            <option value="South America">America del sur</option>
            <option value="Africa">Africa</option>
            <option value="Antartica">Antartica</option>
        </select>
        
        <select
        name="activity"
        onChange={handleChange}
        value={filter.activity ? filter.activity : ""}
        >
            <option value={""}>Actividades</option>
            {
            activities.map( activity => <option value={activity.name}>{activity.name}</option>)
        }
        </select>

        <select 
        name="order"
        onChange={handleChange}
        value={filter.order? filter.order : ""}
        >
            <optgroup label="Alfabeto">
            <option value="">Ascendente</option>
            <option value="AlphabetDES">Descendente</option>
            </optgroup>

            <optgroup label="Poblacion">
            <option value="PopulationASC">Ascendente</option>
            <option value="PopulationDES">Descendente</option>
            </optgroup>
        </select>

        <select
        name="page"
        onChange={handleChange}
        value={filter.page ? filter.page : "0"}
        >
            {maxPages.map(e => <option>{e}</option>)}
        </select>


        <button onClick={handleClick}> Resetear filtro </button>
        </div>
    )


}

export default SearchBar;