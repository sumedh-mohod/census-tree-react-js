import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_ZONES, DELETE_ZONES,  EDIT_ZONES, GET_ZONES } from "./Types";

const GetZones = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/zones?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddZones = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/zones",params);
      dispatch({
        type: ADD_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditZones = (params,districtsId) => async (dispatch) => {
      console.log("EDIT ZONES",params);
    try {
      const response = await JWTServer.put(`/api/zones/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteZones = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/zones/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetZones,
      AddZones,
      EditZones,
      DeleteZones
  }