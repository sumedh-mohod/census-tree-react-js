import {
    GET_DISTRICTS,
    GET_STATE,
    RESET_STATE,
    ADD_STATE,
    EDIT_STATE,
    DELETE_STATE,
    ADD_DISTRICTS,
    EDIT_DISTRICTS,
    DELETE_DISTRICTS,
    GET_TALUKAS,
    ADD_TALUKAS,
    EDIT_TALUKAS,
    DELETE_TALUKAS
  } from "../actions/Types";
  
  const INIT_STATE = {
    districts:null,
    states:null,
    addStateLog:false,
    editStateLog:false,
    deleteStateLog:false,
    addDistrictsLog:false,
    editDistrictsLog:false,
    deleteDistrictsLog:false,
    talukas:null,
    addTalukasLog:false,
    editTalukasLog:false,
    deleteTalukasLog:false,
  };
  
  export default function MasterReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_STATE:
            return{
                ...state,
                states: payload.data,
        };

        case ADD_STATE:
            return{
                ...state,
                addStateLog: !state.addStateLog,
        };

        case EDIT_STATE:
            return{
                ...state,
                editStateLog: !state.editStateLog,
        };

        case DELETE_STATE:
            return{
                ...state,
                deleteStateLog: !state.deleteStateLog,
        };

        case GET_DISTRICTS:
          return{
              ...state,
              districts: payload.data,
        };

        case ADD_DISTRICTS:
            return{
                ...state,
                addDistrictsLog: !state.addDistrictsLog,
        };

        case EDIT_DISTRICTS:
            return{
                ...state,
                editDistrictsLog: !state.editDistrictsLog,
        };

        case DELETE_DISTRICTS:
            return{
                ...state,
                deleteDistrictsLog: !state.deleteDistrictsLog,
        };

        case GET_TALUKAS:
          return{
              ...state,
              talukas: payload.data,
        };

        case ADD_TALUKAS:
            return{
                ...state,
                addTalukasLog: !state.addTalukasLog,
        };

        case EDIT_TALUKAS:
            return{
                ...state,
                editTalukasLog: !state.editTalukasLog,
        };

        case DELETE_TALUKAS:
            return{
                ...state,
                deleteTalukasLog: !state.deleteTalukasLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  