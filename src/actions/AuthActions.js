import Server from "../api";
import JWTServer from "../api/withJWTServer";

import {
  LOGIN,
  LOG_OUT,
  RESET_STATE
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { SetNewAlert } from "./AlertActions";
import { ShowLoader, ShowLoadingButton } from './CommonAction';

const ResetState = () => ({
    type: RESET_STATE,
    payload: null,
  });

const LoginUser = (params) => async (dispatch) => {
    try {
      const response = await Server.post("/api/login", params);
      // console.log("RESPONSE LOGIN",response.data);
      localStorage.setItem("token",response.data.access_token)
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
      dispatch(ShowLoadingButton(false));
    } catch (e) {
      dispatch(ShowLoadingButton(false));
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

const Logout = () => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/logout");
      // console.log("RESPONSE LOGOUT",response.data);
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
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SessionExpired = () => async (dispatch) => {
    try {
      localStorage.clear();
      
      dispatch({
        type: LOG_OUT,
        payload: null,
      });
      dispatch({
        type: RESET_STATE,
        payload: null,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };




export {
  LoginUser,
  Logout,
  SessionExpired
};
