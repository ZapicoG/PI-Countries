import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_ACTIVITIES = "GET_ALL_ACTIVITIES"
export const SET_COUNTRY = "SET_COUNTRY";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const CHANGE_FILTERED = "CHANGE_FILTERED";
export const ADD_TO_ACTIVITY = "ADD_TO_ACTIVITY";




export const getCountries = () => dispatch => {
    return axios.get("http://localhost:3001/countries")
    .then(r => r.data)
    .then(d => dispatch({type: GET_ALL_COUNTRIES, payload: d}))
    .catch(e => console.log(e))
};


export const getActivities = () => dispatch => {
    return axios.get("http://localhost:3001/activities")
    .then(r => r.data)
    .then(d => dispatch({type: GET_ACTIVITIES, payload: d}))
    .catch(e => console.log(e))
}

export const setCountry = (id) => dispatch => {
    return axios.get(`http://localhost:3001/countries/${id}`)
    .then(r => r.data)
    .then(d => dispatch({type: SET_COUNTRY, payload: d}))
    .catch(e => console.log(e))
}

export const createActivity = (input) => dispatch => {
    return axios.post("http://localhost:3001/activities", input)
    .then(r => r.data)
    .then(d => dispatch({type: CREATE_ACTIVITY, payload: d}))
    .then(e => console.log(e))
}

export const addToActivity = (input) => dispatch => {
    console.log(input)
    return axios.post("http://localhost:3001/activities/addCountry", input)
    .then(r => r.data)
    .then(d => dispatch({type: ADD_TO_ACTIVITY, payload: d}))
    .catch(e => console.log(e))
}

export const changeFilter = (filter) => dispatch => {
    return dispatch({type: CHANGE_FILTER, payload: filter})
}

export const changeFiltered = (filtered) => dispatch => {
    return dispatch({type: CHANGE_FILTERED, payload: filtered})
}




// Fetch + Async Await


// export const getCountries =  () => async dispatch => {
//     try {
//         let countries = await fetch("http://localhost:3001/countries");
//         countries = await countries.json();
//         return dispatch({type: GET_ALL_COUNTRIES, payload: countries});
//     } catch (e) {
//         return console.log(e);
//     }
// }

// export const getActivities = () => async dispatch => {
//     try {
//         let activities = await fetch("http://localhost:3001/activities");
//         activities = await activities.json();
//         return dispatch({type: GET_ACTIVITIES, payload: activities})
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const setCountry = (id) => async dispatch => {
//     try {
//         let country = await fetch(`http://localhost:3001/countries/${id}`);
//         country = await country.json();
//         return dispatch({type: SET_COUNTRY, payload: country})
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const createActivity = (input) => async dispatch => {
//     try {
//         let activities = await fetch(`http://localhost:3001/activities`, {
//             method: 'POST',
//             body: JSON.stringify(input), 
//             headers:{
//               'Content-Type': 'application/json'
//             }});
//         activities = await activities.json();
//         return dispatch({type: CREATE_ACTIVITY, payload: activities})
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const addToActivity = (input) => async dispatch => {
//     try {
//         let countryToAdd = await fetch(`http://localhost:3001/activities/addCountry`, {
//             method: 'POST',
//             body: JSON.stringify(input), 
//             headers:{
//               'Content-Type': 'application/json'
//             }});

//         console.log(1,input)
//         console.log(countryToAdd)
//         countryToAdd = await countryToAdd.json();
//         return dispatch({type: ADD_TO_ACTIVITY, payload: countryToAdd})
//     } catch (e) {
//         console.log(e)
//     }
// }

// export const changeFilter = (filter) => dispatch => {
//     return dispatch({type: CHANGE_FILTER, payload: filter})
// }

// export const changeFiltered = (filtered) => dispatch => {
//     return dispatch({type: CHANGE_FILTERED, payload: filtered})
// }