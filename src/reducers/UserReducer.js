import { ADD_USER, DELETE_USER, EDIT_USER, GET_RELIGIONS, GET_SALARY_DEDUCTION_TYPES, GET_USER, GET_USER_BY_ID, GET_ACTIVE_USER, GET_USERS_BY_ROLEID, GET_USER_DOCUMENT_TYPES, RESET_STATE, UNLINK_DEVICE } from "../actions/Types";
  
  const INIT_STATE = {
    users:null,
    activeUsers:null,
    userById:null,
    userByRoleID:null,
    addUsersLog:false,
    editUsersLog:false,
    deleteUsersLog:false,
    pageInfo:{},
    salaryDeductionType:[],
    userDocumentType:[],
    religions:[],
    unlinkDeviceLog:false
  };
  
  export default function UserReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_USER:
          return{
              ...state,
              users: payload.data.data,
              pageInfo: payload.data
        };

        case GET_ACTIVE_USER:
          return{
              ...state,
              activeUsers: payload.data,
        };

        case GET_USER_BY_ID:
          return{
              ...state,
              userById: payload.data,
        };

        case GET_USERS_BY_ROLEID:
          return{
              ...state,
              userByRoleID: payload.data,
        };

        case ADD_USER:
            return{
                ...state,
                addUsersLog: !state.addUsersLog,
        };

        case EDIT_USER:
            return{
                ...state,
                editUsersLog: !state.editUsersLog,
        };

        case DELETE_USER:
            return{
                ...state,
                deleteUsersLog: !state.deleteUsersLog,
        };

        case GET_SALARY_DEDUCTION_TYPES:
          return{
              ...state,
              salaryDeductionType: payload.data,
        };

        case GET_USER_DOCUMENT_TYPES:
          return{
              ...state,
              userDocumentType: payload.data,
        };

        case GET_RELIGIONS:
          return{
              ...state,
              religions: payload.data,
        };

        case UNLINK_DEVICE:
          return{
              ...state,
              unlinkDeviceLog: !state.unlinkDeviceLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  