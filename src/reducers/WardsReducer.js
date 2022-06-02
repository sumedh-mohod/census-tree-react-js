import {  ADD_WARDS, DELETE_WARDS, EDIT_WARDS, GET_WARDS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    wards:null,
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
  