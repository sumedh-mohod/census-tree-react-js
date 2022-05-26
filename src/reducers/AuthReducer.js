import {
    LOGIN,
    RESET_STATE,
  } from "../actions/Types";
  
  const INIT_STATE = {
    authLog: null,
    isLogged: false,
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
          isLogged: true,
        };
      case RESET_STATE:
        return { ...INIT_STATE };
      default:
        return state;
    }
  };
  