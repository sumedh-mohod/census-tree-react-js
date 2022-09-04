import {GET_WORK_REPORTS,GET_ALL_WORK_REPORTS, RESET_STATE, GET_WORK_TYPES_WORK_REPORTS } from "../actions/Types";
  
  const INIT_STATE = {
    workReports: null,
    excelWorkReports:[],
    pageInfo:{},
    workTypeWorkReports:null
 
  };

  
  export default function ReportsReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;

  
    switch (type) {
        case GET_WORK_REPORTS:
          return{
              ...state,
              workReports: payload.data,
              pageInfo: payload.data
        };

        case GET_WORK_TYPES_WORK_REPORTS:
          return{
              ...state,
              workTypeWorkReports: payload.data,
        };

        case GET_ALL_WORK_REPORTS:
          return{
            ...state,
            excelWorkReports: payload.data,
          }

    

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  