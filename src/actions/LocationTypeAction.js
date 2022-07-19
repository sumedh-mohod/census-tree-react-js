import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_LOCATION_TYPES, DELETE_LOCATION_TYPES, EDIT_LOCATION_TYPES, GET_LOCATION_TYPES, GET_ACTIVE_LOCATION_TYPES } from "./Types";

const GetLocationType = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/location-types?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_LOCATION_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  const GetActiveLocationType = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/location-types?status=${status}`);
      console.log("active location type RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_LOCATION_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };



  const SearchLocationType = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/location-types?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_LOCATION_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddLocationType = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/location-types",params);
      dispatch({
        type: ADD_LOCATION_TYPES,
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

  const EditLocationType = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/location-types/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_LOCATION_TYPES,
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

  const DeleteLocationType = (params,status) => async (dispatch) => {
      console.log("DElET STATUS",status);
    try {
      const response = await JWTServer.delete(`/api/location-types/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_LOCATION_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetLocationType,
      SearchLocationType,
      AddLocationType,
      EditLocationType,
      DeleteLocationType,
      GetActiveLocationType,
  }