import { GET_PROPERTY_BY_COUNCIL_ID, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    properties:[],
    pageInfo:{}
  };
  
  export default function PropertyReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_PROPERTY_BY_COUNCIL_ID:
          return{
              ...state,
              properties: payload.data.data,
              pageInfo: payload.data
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  