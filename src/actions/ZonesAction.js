import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_ZONES, DELETE_ZONES,  EDIT_ZONES, GET_ZONES, GET_ACTIVE_ZONES, GET_ACTIVE_ZONES_BY_COUNCILID } from "./Types";

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

  const GetActiveZones = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/zones?status=${status}`);
      console.log("active zones RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SetActiveZones = (obj) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ACTIVE_ZONES,
        payload: obj,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetZonesByCouncilId = (page,limit,councilId) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/zones?page=${page}&limit=${limit}&council_id=${councilId}`);
      dispatch({
        type: GET_ZONES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveZonesByCouncilId = (status,councilId) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/zones?status=${status}&council_id=${councilId}`);
      console.log("Active zones council RESPONSE",response.data.data);
      dispatch({
        type: GET_ACTIVE_ZONES_BY_COUNCILID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchZones = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/zones?page=${page}&limit=${limit}&search=${searchValue}`);
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
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
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
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
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
      GetActiveZones,
      SetActiveZones,
      GetZonesByCouncilId,
      GetActiveZonesByCouncilId,
      SearchZones,
      AddZones,
      EditZones,
      DeleteZones
  }