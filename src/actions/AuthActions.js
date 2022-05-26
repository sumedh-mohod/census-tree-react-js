import Server from "../api";
import JWTServer from "../api/withJWTServer";

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
      localStorage.setItem("token",response.data.access_token)
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

const Logout = () => {
  return async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/logout");
      console.log("RESPONSE LOGOUT",response.data);
      localStorage.clear();
      
      dispatch({
        type: LOG_OUT,
        payload: response.data,
      });
      dispatch({
        type: RESET_STATE,
        payload: null,
      });
    } catch (e) {
    //   dispatch({
      console.log("INSIDE LOGOUT CATCH",e);
    //     type: LOADER,
    //     payload: null,
    //   });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };
};



export {
  LoginUser,
  Logout
};
