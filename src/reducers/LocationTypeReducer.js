import { ADD_LOCATION_TYPES, DELETE_LOCATION_TYPES, EDIT_LOCATION_TYPES, GET_LOCATION_TYPES, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    locationTypes:null,
    addLocationTypesLog:false,
    editLocationTypesLog:false,
    deleteLocationTypesLog:false,
    pageInfo:{}
  };
  
  export default function LocationTypeReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_LOCATION_TYPES:
          return{
              ...state,
              locationTypes: payload.data.data,
              pageInfo: payload.data
        };

        case ADD_LOCATION_TYPES:
            return{
                ...state,
                addLocationTypesLog: !state.addLocationTypesLog,
        };

        case EDIT_LOCATION_TYPES:
            return{
                ...state,
                editLocationTypesLog: !state.editLocationTypesLog,
        };

        case DELETE_LOCATION_TYPES:
            return{
                ...state,
                deleteLocationTypesLog: !state.deleteLocationTypesLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  