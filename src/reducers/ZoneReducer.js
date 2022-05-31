import { ADD_ZONES, DELETE_ZONES, EDIT_ZONES, GET_ZONES, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    zones:null,
    addZonesLog:false,
    editZonesLog:false,
    deleteZonesLog:false
  };
  
  export default function ZoneReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_ZONES:
          return{
              ...state,
              zones: payload.data,
        };

        case ADD_ZONES:
            return{
                ...state,
                addZonesLog: !state.addZonesLog,
        };

        case EDIT_ZONES:
            return{
                ...state,
                editZonesLog: !state.editZonesLog,
        };

        case DELETE_ZONES:
            return{
                ...state,
                deleteZonesLog: !state.deleteZonesLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  