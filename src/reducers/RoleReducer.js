import { ADD_ROLE, DELETE_ROLE, EDIT_ROLE, GET_ACTVE_ROLE, GET_PERMISSION, GET_ROLE, GET_ROLE_BY_ID, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    roles:null,
    addRolesLog:false,
    editRolesLog:false,
    deleteRolesLog:false,
    permission:null,
    roleById:null,
    pageInfo:{}
  };
  
  export default function RoleReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_ROLE:
          return{
              ...state,
              roles: payload.data.data,
              pageInfo: payload.data
        };
        case GET_ACTVE_ROLE:
          return{
              ...state,
              roles: payload.data,
        };
        case GET_ROLE_BY_ID:
          return{
              ...state,
              roleById: payload.data,
        };
        case ADD_ROLE:
            return{
                ...state,
                addRolesLog: !state.addRolesLog,
        };
        case EDIT_ROLE:
            return{
                ...state,
                editRolesLog: !state.editRolesLog,
        };
        case DELETE_ROLE:
            return{
                ...state,
                deleteRolesLog: !state.deleteRolesLog,
        };
        case GET_PERMISSION:
          return{
              ...state,
              permission: payload.data,
        };
        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  