import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_PROPERTY_TYPES, DELETE_PROPERTY_TYPES, EDIT_PROPERTY_TYPES, GET_PROPERTY_TYPES } from "./Types";

const GetPropertyType = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/property-types?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_PROPERTY_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddPropertyType = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/property-types",params);
      dispatch({
        type: ADD_PROPERTY_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditPropertyType = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/property-types/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_PROPERTY_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeletePropertyType = (params,status) => async (dispatch) => {
      console.log("DElET STATUS",status);
    try {
      const response = await JWTServer.delete(`/api/property-types/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_PROPERTY_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetPropertyType,
      AddPropertyType,
      EditPropertyType,
      DeletePropertyType
  }