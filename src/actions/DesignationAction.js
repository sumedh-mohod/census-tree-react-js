import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_DESIGNATIONS, DELETE_DESIGNATIONS, EDIT_DESIGNATIONS, GET_ACTIVE_DESIGNATIONS, GET_DESIGNATIONS } from "./Types";

const GetDesignations = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/designations?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_DESIGNATIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveDesignations = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/designations?status=${status}`);
      dispatch({
        type: GET_ACTIVE_DESIGNATIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchDesignations = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/designations?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_DESIGNATIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddDesignations = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/designations",params);
      dispatch({
        type: ADD_DESIGNATIONS,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditDesignations = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/designations/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_DESIGNATIONS,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteDesignations = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/designations/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_DESIGNATIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetDesignations,
      GetActiveDesignations,
      SearchDesignations,
      AddDesignations,
      EditDesignations,
      DeleteDesignations
  }