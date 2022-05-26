import {
    LOGIN,
    LOG_OUT,
    RESET_STATE,
  } from "../actions/Types";
  
  const INIT_STATE = {
    authLog: null,
    isLogged: false,
    isLoggedOut:false,
    loggedUser: null,
    loggedUserId: null,
  };
  
  export default function AuthReduer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN:
        return {
          ...state,
          loggedUser: payload.data,
          isLogged: !state.isLogged,
        };
        case LOG_OUT:
          return {
            ...state,
            isLoggedOut: !state.isLoggedOut,
          };
      case RESET_STATE:
        return { ...INIT_STATE };
      default:
        return state;
    }
  };
  