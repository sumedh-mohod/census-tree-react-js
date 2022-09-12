import { ADD_TREE_NAME, DELETE_TREE_NAME, EDIT_TREE_NAME, GET_TREE_NAME, GET_ACTIVE_TREE_NAME, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeName:null,
    activeTreeName:null,
    addTreeNameLog:false,
    editTreeNameLog:false,
    deleteTreeNameLog:false,
    pageInfo:{}
  };
  
  export default function TreeNameReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_NAME:
          return{
              ...state,
              treeName: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_TREE_NAME:
          return{
              ...state,
              activeTreeName: payload.data,
        };

        case ADD_TREE_NAME:
            return{
                ...state,
                addTreeNameLog: !state.addTreeNameLog,
        };

        case EDIT_TREE_NAME:
            return{
                ...state,
                editTreeNameLog: !state.editTreeNameLog,
        };

        case DELETE_TREE_NAME:
            return{
                ...state,
                deleteTreeNameLog: !state.deleteTreeNameLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  