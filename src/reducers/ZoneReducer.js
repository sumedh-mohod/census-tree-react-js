import { ADD_ZONES, DELETE_ZONES, EDIT_ZONES, GET_ZONES, GET_ACTIVE_ZONES, GET_ACTIVE_ZONES_BY_COUNCILID, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    zones:null,
    activeZones: null,
    activeZonesByCID: null,
    addZonesLog:false,
    editZonesLog:false,
    deleteZonesLog:false,
    pageInfo:{}
  };
  
  export default function ZoneReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_ZONES:
          return{
              ...state,
              zones: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_ZONES:
          return{
              ...state,
              activeZones: payload.data,
             
        };

        case GET_ACTIVE_ZONES_BY_COUNCILID:
          return{
              ...state,
              activeZonesByCID: payload.data,
             
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
  