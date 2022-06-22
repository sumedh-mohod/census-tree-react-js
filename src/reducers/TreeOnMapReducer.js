import { GET_SPECIFIC_TREE_LOCATION_DETAILS, GET_TREE_LOCATION, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeLocation:[],
    treeDetails:{}
  };
  
  export default function TreeOnMapReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_LOCATION:
          return{
              ...state,
              treeLocation: payload.data
        };

        case GET_SPECIFIC_TREE_LOCATION_DETAILS:
          return{
              ...state,
              treeDetails: payload.data
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  