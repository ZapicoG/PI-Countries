import {React, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToActivity, createActivity } from "../Actions";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"
import "../css/CreateActivity.css"
import CountryTag from "./CountryTag";



export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Falta agregar nombre';
  } else if (/[^a-z,A-Z, ]+/gmi.test(input.name)) {
    errors.name = 'Usar solo letras';
  }
  if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "La dificultad debe ser entre 1 y 5";
  }
  if (input.length < 1 || input.length > 12) {
    errors.length = "La duracion debe ser entre 1hs a 12hs"
  }
  return errors;
};


const CreateActivity = () => {
  const stateCountries = useSelector(state => state.countries)
  const activities = useSelector(state => state.activities)
  const [input, setInput] = useState({
    name: "",
    difficulty: "1",
    length: "1",
    season: "Primavera",
    country: ""
  })
  const [countries, setCountries] = useState([])
  const [errors, setErrors] = useState({}); 

  const handleChange = (e) => {
      setInput({...input, [e.target.name]: e.target.value});
      setErrors(validate({...input, [e.target.name]: e.target.value}));
 }
  const dispatch = useDispatch();


  const submit = () => {
      let temp = countries.map(c => c[0])
      dispatch(createActivity({...input, countries: temp}))
  }

  const addSubmit = (activity) => {
    let temp = countries.map(c => c[0])
    let toDispatch = {id: activity.id, countries: temp}
    console.log(toDispatch)
    dispatch(addToActivity(toDispatch))
  }

  const addCountry = (e) =>{
    e.preventDefault();
    let country = input.country
    setInput({...input, country: ""})
    if (countries.some(c => c[0].toLowerCase() == country.toLowerCase())) {
      alert("El pais ya se encuentra agregado");
      return
    }
    country = validateCountry(country)
    if (country) {
      setCountries([...countries,[country.name, country.flag]])
      // countries.push([country.name, country.flag])
    }
    else alert("El pais ingresado no se encontro")
  }

  const validateCountry = (country) => {
    country = stateCountries.find(c => c.name.toLowerCase() === country.toLowerCase())
    return country ? country : false
  }


  const resetForm = () => {
    setInput({
      name: "",
      difficulty: "1",
      length: "1",
      season: "Primavera",
      country: ""
    })
    setErrors({})
    setCountries([])
  }


  const deleteCountry = (name) => {
    setCountries(countries.filter(c => c[0].toLowerCase() != name.toLowerCase()))
  }

  const checkActivities = () => {
    let temp = activities.filter(a => (a.name.toLowerCase() === input.name.toLowerCase() && a.difficulty === input.difficulty && a.length == input.length && a.season === input.season))
    temp = temp[0]
    return temp
  }




  return ( 
        <Popup trigger={<button className="button"> Crear actividad </button>} modal nested >
             {close => ( <div className="modal"> <button className="close" onClick={() =>{close(); resetForm()}}> X </button> 
             <form onSubmit={submit} autoComplete="off">
                <label>Nombre: </label>
                <input 
                type="text" 
                name="name"
                value={input.name}
                onChange={handleChange}
                />


                <label>Dificultad: </label>
                <input 
                type="number" 
                name="difficulty"
                value={input.difficulty}
                onChange={handleChange}
                />


                <label>Duracion: </label>
                <input 
                type="number" 
                name="length"
                value={input.length}
                onChange={handleChange}
                />

                <label>Estacion: </label>
                <select
                name="season"
                value={input.season}
                onChange={handleChange}
                >
                  <option value="Primavera">Primavera</option>
                  <option value="Verano">Verano</option>
                  <option value="Otoño">Otoño</option>
                  <option value="Invierno">Invierno</option>
                </select>
              

                {errors.name && (<p className='danger'>{errors.name}</p>)}
                {errors.difficulty && (<p className='danger'>{errors.difficulty}</p>)}
                {errors.length && (<p className='danger'>{errors.length}</p>)}
                {errors.season && (<p className='danger'>{errors.season}</p>)}

            </form>
            <div>
                <label>Agregar paises: </label>
              
                <input
                autoComplete="off"
                type="text"
                name="country"
                value={input.country}
                onChange={handleChange}
                onKeyDown={(e) => {if (e.key == "Enter") addCountry(e)}}
                />
                <button type="submit" onClick={addCountry}>+</button>

            </div>
            <div class="countryTags">
            {countries.map(c => <CountryTag name={c[0]} imageUrl={c[1]} deleteCountry={deleteCountry}/>)}
            </div>
              
             
             <button className="button" onClick={() => {
              // console.log(activities)
              let err = validate(input)
              if (Object.keys(err).length) return alert("Corroborar los datos ingresados");
              let activity = checkActivities()
              if (activity) {
                addSubmit(activity);
                resetForm();
                return;
              }
              submit();
              resetForm()
              }}> Seguir agregando actividades</button>


             <button className="button" onClick={() => { 
              let err = validate(input)
              if (Object.keys(err).length) return alert("Corroborar los datos ingresados");
              close();
              let activity = checkActivities()
              if (activity) {
                console.log("caca   ")
                addSubmit(activity);
                resetForm();
                return;
              }
              submit();
              resetForm()
              }} > Agregar Actividad </button> 
             
             </div> )} 
        </Popup>);
};

export default CreateActivity;