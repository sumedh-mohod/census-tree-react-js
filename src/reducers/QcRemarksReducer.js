import {
    GET_QCREMARKS,
    ADD_QCREMARKS,
    EDIT_QCREMARKS,
    DELETE_QCREMARKS,
    RESET_STATE,
    // GET_DISTRICTS_BY_STATE_ID
  } from "../actions/Types";
  
  const INIT_STATE = {
    qcremarks:null,
    addQcRemarksLog:false,
    editQcRemarksLog:false,
    deleteQcRemarksLog:false,
    pageInfo:{}
  };
  
  export default function MasterReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
    switch (type) {

        case  GET_QCREMARKS:
          return{
              ...state,
              qcremarks: payload.data.data,
              pageInfo: payload.data
        };

        // case GET_DISTRICTS_BY_STATE_ID:
        //     return{
        //         ...state,
        //         districts: payload.data,
        //   };

        case ADD_QCREMARKS:
            return{
                ...state,
                addQcRemarksLog: !state.addQcRemarksLog,
        };

        case EDIT_QCREMARKS:
            return{
                ...state,
                editQcRemarksLog: !state.editQcRemarksLog,
        };

        case DELETE_QCREMARKS:
            return{
                ...state,
                deleteQcRemarksLog: !state.deleteQcRemarksLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  