import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_TREE_NAME, DELETE_TREE_NAME, EDIT_TREE_NAME, GET_TREE_NAME } from "./Types";

const GetTreeName = () => async (dispatch) => {
    try {
      const response = await JWTServer.get("/api/tree-names");
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTreeName = (params) => async (dispatch) => {
    console.log("PARAMS",params);
    try {
      const response = await JWTServer.post("/api/tree-names",params);
      dispatch({
        type: ADD_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditTreeName = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/tree-names/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteTreeName = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/tree-names/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetTreeName,
      AddTreeName,
      EditTreeName,
      DeleteTreeName
  }