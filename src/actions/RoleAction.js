import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_ROLE, DELETE_ROLE, EDIT_ROLE, GET_PERMISSION, GET_ROLE, GET_ROLE_BY_ID } from "./Types";

const GetRole = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/roles?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_ROLE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetRoleById = (id) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/roles/${id}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_ROLE_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddRole = (params) => async (dispatch) => {
      console.log("ADD ROLE PARAMS",params);
    try {
      const response = await JWTServer.post("/api/roles",params);
      dispatch({
        type: ADD_ROLE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditRole = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/roles/${districtsId}`,params);
      dispatch({
        type: EDIT_ROLE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteRole = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/roles/${params}?status=${status}`);
      dispatch({
        type: DELETE_ROLE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetPermission = () => async (dispatch) => {
    try {
      const response = await JWTServer.get("/api/permissions");
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_PERMISSION,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetRole,
      AddRole,
      EditRole,
      DeleteRole,
      GetPermission,
      GetRoleById
  }