import {
    GET_TREE_DISEASE,
    RESET_STATE,
    ADD_TREE_DISEASE,
    EDIT_TREE_DISEASE,
    DELETE_TREE_DISEASE,
    // GET_DISTRICTS_BY_STATE_ID
  } from "../actions/Types";
  
  const INIT_STATE = {
    treeDisease:null,
    addTreeDiseaseLog:false,
    editTreeDiseaseLog:false,
    deleteTreeDiseaseLog:false,
    pageInfo:{}
  };
  
  export default function MasterReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_DISEASE:
            return{
                ...state,
                treeDisease: payload.data.data,
                pageInfo: payload.data
        };

        case ADD_TREE_DISEASE:
            return{
                ...state,
                addTreeDiseaseLog: !state.addTreeDiseaseLog,
        };

        case EDIT_TREE_DISEASE:
            return{
                ...state,
                editTreeDiseaseLog: !state.editTreeDiseaseLog,
        };

        case DELETE_TREE_DISEASE:
            return{
                ...state,
                deleteTreeDiseaseLog: !state.deleteTreeDiseaseLog,
        };

        // case GET_DISTRICTS_BY_STATE_ID:
        //     return{
        //         ...state,
        //         districts: payload.data,
        //   };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  