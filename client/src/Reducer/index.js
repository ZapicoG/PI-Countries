import * as ACTIONS from "../Actions/index";

const initialState = {
    countries: [],
    filtered: [],
    country: {},
    activities: [],
    filter: {
        name: "",
        poblacionMayor: "",
        continent: "",
        activity: "",
        order: "",
        page: "0"
    }
}


const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case ACTIONS.GET_ALL_COUNTRIES:
            return {...state, countries: action.payload,}
        case ACTIONS.GET_ACTIVITIES:
            return {...state, activities: action.payload}
        case ACTIONS.CREATE_ACTIVITY:
            return {...state, activities: [...state.activities, action.payload]}
        case ACTIONS.ADD_TO_ACTIVITY:
            return {...state, activities: [...state.activities]}
        case ACTIONS.SET_COUNTRY:
            return {...state, country: action.payload}
        case ACTIONS.CHANGE_FILTER:
            return {...state, filter: action.payload}
        case ACTIONS.CHANGE_FILTERED:
            return {...state, filtered: action.payload}
        default:
            return {...state};
    }
}

export default rootReducer;