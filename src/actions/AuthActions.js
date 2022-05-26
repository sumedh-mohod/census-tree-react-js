import Server from "../api";

import {
  LOGIN,
  LOG_OUT,
  RESET_STATE
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";

const ResetState = () => {
  return {
    type: RESET_STATE,
    payload: null,
  };
};

const LoginUser = (params) => {
  return async (dispatch) => {
    try {
      const response = await Server.post("/api/login", params);
      console.log("RESPONSE LOGIN",response.data);
      
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (e) {
    //   dispatch({
      console.log("INSIDE CATCH",e);
    //     type: LOADER,
    //     payload: null,
    //   });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };
};


export {
  LoginUser
};
