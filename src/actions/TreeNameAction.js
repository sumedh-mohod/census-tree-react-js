import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_TREE_NAME, DELETE_TREE_NAME, EDIT_TREE_NAME, GET_TREE_NAME, GET_ACTIVE_TREE_NAME } from "./Types";

const GetTreeName = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-names?page=${page}&limit=${limit}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveTreeName = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-names?status=${status}`);
      // console.log("active tree names RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchTreeName = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-names?page=${page}&limit=${limit}&search=${searchValue}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TREE_NAME,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTreeName = (params) => async (dispatch) => {
    // console.log("PARAMS",params);
    try {
      const response = await JWTServer.post("/api/tree-names",params);
      dispatch({
        type: ADD_TREE_NAME,
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

  const EditTreeName = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/tree-names/${districtsId}`,params);
      // console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TREE_NAME,
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

  const DeleteTreeName = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/tree-names/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
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
      GetActiveTreeName,
      SearchTreeName,
      AddTreeName,
      EditTreeName,
      DeleteTreeName
  }