import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_TREE_CONDITIONS, DELETE_TREE_CONDITIONS, EDIT_TREE_CONDITIONS, GET_TREE_CONDITIONS } from "./Types";

const GetTreeConditions = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-conditions?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TREE_CONDITIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTreeConditions = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/tree-conditions",params);
      dispatch({
        type: ADD_TREE_CONDITIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditTreeConditions = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/tree-conditions/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TREE_CONDITIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteTreeConditions = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/tree-conditions/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_TREE_CONDITIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetTreeConditions,
      AddTreeConditions,
      EditTreeConditions,
      DeleteTreeConditions
  }