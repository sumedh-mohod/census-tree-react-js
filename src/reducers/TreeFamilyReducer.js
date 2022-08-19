import { ADD_TREE_FAMILY, DELETE_TREE_FAMILY, EDIT_TREE_FAMILY, GET_TREE_FAMILY, GET_ACTIVE_TREE_FAMILY, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeFamily:null,
    activeTreeFamily:null,
    addTreeFamilyLog:false,
    editTreeFamilyLog:false,
    deleteTreeFamilyLog:false,
    pageInfo:{}
  };
  
  export default function TreeTypeReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_FAMILY:
          return{
              ...state,
              treeFamily: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_TREE_FAMILY:
            return{
                ...state,
                activeTreeFamily: payload.data,
        };

        case ADD_TREE_FAMILY:
            return{
                ...state,
                addTreeFamilyLog: !state.addTreeFamilyLog,
        };

        case EDIT_TREE_FAMILY:
            return{
                ...state,
                editTreeFamilyLog: !state.editTreeFamilyLog,
        };

        case DELETE_TREE_FAMILY:
            return{
                ...state,
                deleteTreeFamilyLog: !state.deleteTreeFamilyLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  