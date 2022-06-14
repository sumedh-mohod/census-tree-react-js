import { GET_DENIED_ENTRY, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    pageInfo:{},
    deniedEntry:[]
  };
  
  export default function DeniedEntryReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_DENIED_ENTRY:
          return{
              ...state,
              deniedEntry: payload.data.data,
              pageInfo: payload.data
        };
        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  