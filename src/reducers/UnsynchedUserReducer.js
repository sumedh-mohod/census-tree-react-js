import { GET_UNSYNCHEDUSERS_BY_COUNCIL_ID, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    pageInfo:{},
    unsynchedUser:[]
  };
  
  export default function UnsynchedUserReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
    console.log("unsynchedUser.........", payload)
  
    switch (type) {
        case GET_UNSYNCHEDUSERS_BY_COUNCIL_ID:
          return{
              ...state,
              unsynchedUser: payload.data,
              pageInfo: payload.data
        };
        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };