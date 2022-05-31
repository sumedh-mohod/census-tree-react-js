import { ADD_PROPERTY_TYPES, DELETE_PROPERTY_TYPES, EDIT_PROPERTY_TYPES, GET_PROPERTY_TYPES, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    propertyTypes:null,
    addPropertyTypesLog:false,
    editPropertyTypesLog:false,
    deletePropertyTypesLog:false
  };
  
  export default function PropertyTypeReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_PROPERTY_TYPES:
          return{
              ...state,
              propertyTypes: payload.data,
        };

        case ADD_PROPERTY_TYPES:
            return{
                ...state,
                addPropertyTypesLog: !state.addPropertyTypesLog,
        };

        case EDIT_PROPERTY_TYPES:
            return{
                ...state,
                editPropertyTypesLog: !state.editPropertyTypesLog,
        };

        case DELETE_PROPERTY_TYPES:
            return{
                ...state,
                deletePropertyTypesLog: !state.deletePropertyTypesLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  