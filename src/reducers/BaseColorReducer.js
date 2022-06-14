import {  DELETE_BASE_COLOR_TREES, GET_BASE_COLOR_TREES, GET_BASE_COLOR_TREES_HISTORY, GET_QC_REMARKS_FOR_BASE_COLOR, RESET_STATE, UPDATE_QC_STATUS_BASE_COLOR_TREES } from "../actions/Types";
  
  const INIT_STATE = {
    baseColorTrees:null,
    addBaseColorTreesLog:false,
    editBaseColorTreesLog:false,
    deleteBaseColorTreesLog:false,
    updateQCStatusLog:false,
    pageInfo:{},
    baseColorRemarks:[],
    baseColorTreeHistory:[]
  };
  
  export default function BaseColorReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_BASE_COLOR_TREES:
          return{
              ...state,
              baseColorTrees: payload.data.data,
              pageInfo: payload.data
        };

        case GET_BASE_COLOR_TREES_HISTORY:
          return{
              ...state,
              baseColorTreeHistory: payload.data.data,
              pageInfo: payload.data
        };

        case DELETE_BASE_COLOR_TREES:
          return{
              ...state,
              deleteBaseColorTreesLog: !state.deleteBaseColorTreesLog
        };

        case UPDATE_QC_STATUS_BASE_COLOR_TREES:
            return{
                ...state,
                updateQCStatusLog: !state.updateQCStatusLog,
        };

        case GET_QC_REMARKS_FOR_BASE_COLOR:
          return{
              ...state,
              baseColorRemarks:payload.data
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  