import { ADD_TREE_CONDITIONS, DELETE_TREE_CONDITIONS, EDIT_TREE_CONDITIONS, GET_TREE_CONDITIONS, GET_ACTIVE_TREE_CONDITIONS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    treeConditions:null,
    activeTreeCondition:null,
    addTreeConditionsLog:false,
    editTreeConditionsLog:false,
    deleteTreeConditionsLog:false,
    pageInfo:{}
  };
  
  export default function TreeConditionReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TREE_CONDITIONS:
          return{
              ...state,
              treeConditions: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_TREE_CONDITIONS:
          return{
              ...state,
              activeTreeCondition: payload.data,
        };

        case ADD_TREE_CONDITIONS:
            return{
                ...state,
                addTreeConditionsLog: !state.addTreeConditionsLog,
        };

        case EDIT_TREE_CONDITIONS:
            return{
                ...state,
                editTreeConditionsLog: !state.editTreeConditionsLog,
        };

        case DELETE_TREE_CONDITIONS:
            return{
                ...state,
                deleteTreeConditionsLog: !state.deleteTreeConditionsLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  