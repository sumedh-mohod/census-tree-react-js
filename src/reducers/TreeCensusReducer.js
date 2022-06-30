import { GET_TREE_CENSUS, UPDATE_QC_STATUS_TREE_CENSUS, GET_TREE_CENSUS_HISTORY ,GET_TREE_CENSUS_PENDING_QC_STATUS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeCensus:null,
    addTreeCensusLog:false,
    editTreeCensusLog:false,
    deleteTreeCensusLog:false,
    updateQCStatusLog:false,
    pageInfo:{},
    // baseColorRemarks:[],
    treeCensusHistory:[],
    treeCensusPendingQCStatus:[],
  };
  
  export default function TreeCensusReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_CENSUS:
          return{
              ...state,
              treeCensus: payload.data.data,
              pageInfo: payload.data
        };

        case GET_TREE_CENSUS_HISTORY:
          return{
              ...state,
              treeCensusHistory: payload.data.data,
              pageInfo: payload.data
        };

        case GET_TREE_CENSUS_PENDING_QC_STATUS:
          return{
              ...state,
              treeCensusPendingQCStatus: payload.data,
              pageInfo: payload.data
        }

        case UPDATE_QC_STATUS_TREE_CENSUS:
          return{
              ...state,
              updateQCStatusLog: !state.updateQCStatusLog,
      };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  