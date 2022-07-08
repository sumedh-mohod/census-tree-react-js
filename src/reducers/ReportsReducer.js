import {GET_REPORTS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    reports: null,
 
  };

  
  export default function ReportsReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;

  
    switch (type) {
    
        case GET_REPORTS:
          return{
              ...state,
              reports: payload.data,
              // pageInfo: payload.data
        };

    

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  