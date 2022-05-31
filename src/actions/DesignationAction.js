import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_DESIGNATIONS, DELETE_DESIGNATIONS, EDIT_DESIGNATIONS, GET_DESIGNATIONS } from "./Types";

const GetDesignations = () => async (dispatch) => {
    try {
      const response = await JWTServer.get("/api/designations");
      console.log("DESIGNATIONS RESPONSE",response.data);
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
      AddDesignations,
      EditDesignations,
      DeleteDesignations
  }