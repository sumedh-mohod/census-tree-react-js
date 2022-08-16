import {  ADD_WARDS, DELETE_WARDS, EDIT_WARDS, GET_WARDS, GET_ACTIVE_WARDS, GET_ACTIVE_WARDS_BY_COUNCILID, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    wards:null,
    activeWards:null,
    activeWardsByCID: null,
    addWardsLog:false,
    editWardsLog:false,
    deleteWardsLog:false,
    pageInfo:{}
  };
  
  export default function WardsReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_WARDS:
          return{
              ...state,
              wards: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_WARDS:
          return{
              ...state,
              activeWards: payload.data,
              
        };

        case GET_ACTIVE_WARDS_BY_COUNCILID:
          return{
              ...state,
              activeWardsByCID: payload.data,
              
        };

        case ADD_WARDS:
            return{
                ...state,
                addWardsLog: !state.addWardsLog,
        };

        case EDIT_WARDS:
            return{
                ...state,
                editWardsLog: !state.editWardsLog,
        };

        case DELETE_WARDS:
            return{
                ...state,
                deleteWardsLog: !state.deleteWardsLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  