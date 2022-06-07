import {
    RESET_STATE,
    GET_DISTRICTS,
    ADD_DISTRICTS,
    EDIT_DISTRICTS,
    DELETE_DISTRICTS,
    // GET_DISTRICTS_BY_STATE_ID
  } from "../actions/Types";
  
  const INIT_STATE = {
    districts:null,
    addDistrictsLog:false,
    editDistrictsLog:false,
    deleteDistrictsLog:false,
    pageInfo:{}
  };
  
  export default function MasterReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_DISTRICTS:
          return{
              ...state,
              districts: payload.data.data,
              pageInfo: payload.data
        };

        // case GET_DISTRICTS_BY_STATE_ID:
        //     return{
        //         ...state,
        //         districts: payload.data,
        //   };

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


        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  