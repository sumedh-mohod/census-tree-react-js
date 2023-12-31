import { ADD_TREE_TYPE, DELETE_TREE_TYPE, EDIT_TREE_TYPE, GET_TREE_TYPE, GET_ACTIVE_TREE_TYPE, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeType:null,
    activeTreeType:null,
    addTreeTypeLog:false,
    editTreeTypeLog:false,
    deleteTreeTypeLog:false,
    pageInfo:{}
  };
  
  export default function TreeTypeReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_TYPE:
          return{
              ...state,
              treeType: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_TREE_TYPE:
            return{
                ...state,
                activeTreeType: payload.data,
        };

        case ADD_TREE_TYPE:
            return{
                ...state,
                addTreeTypeLog: !state.addTreeTypeLog,
        };

        case EDIT_TREE_TYPE:
            return{
                ...state,
                editTreeTypeLog: !state.editTreeTypeLog,
        };

        case DELETE_TREE_TYPE:
            return{
                ...state,
                deleteTreeTypeLog: !state.deleteTreeTypeLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  