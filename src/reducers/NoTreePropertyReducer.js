import { GET_NO_TREE_PROPERTY, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    pageInfo:{},
    noTreeProperty:[]
  };
  
  export default function NoTreePropertyReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_NO_TREE_PROPERTY:
          return{
              ...state,
              noTreeProperty: payload.data.data,
              pageInfo: payload.data
        };
        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  