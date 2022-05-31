import { ADD_DESIGNATIONS, DELETE_DESIGNATIONS, EDIT_DESIGNATIONS, GET_DESIGNATIONS, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    designations:null,
    addDesignationsLog:false,
    editDesignationsLog:false,
    deleteDesignationsLog:false
  };
  
  export default function DesignationReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_DESIGNATIONS:
          return{
              ...state,
              designations: payload.data,
        };

        case ADD_DESIGNATIONS:
            return{
                ...state,
                addDesignationsLog: !state.addDesignationsLog,
        };

        case EDIT_DESIGNATIONS:
            return{
                ...state,
                editDesignationsLog: !state.editDesignationsLog,
        };

        case DELETE_DESIGNATIONS:
            return{
                ...state,
                deleteDesignationsLog: !state.deleteDesignationsLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  