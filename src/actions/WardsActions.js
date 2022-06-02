import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_WARDS, DELETE_WARDS, EDIT_WARDS, GET_WARDS } from "./Types";

const GetWards = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/wards?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_WARDS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddWards = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/wards",params);
      dispatch({
        type: ADD_WARDS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditWards = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/wards/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_WARDS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteWards = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/wards/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_WARDS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetWards,
      AddWards,
      EditWards,
      DeleteWards
  }