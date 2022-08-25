import {GET_WORK_REPORTS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    workReports: null,
 
  };

  
  export default function ReportsReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;

  
    switch (type) {
    
        case GET_WORK_REPORTS:
          return{
              ...state,
              workReports: payload.data,
              // pageInfo: payload.data
        };

    

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  