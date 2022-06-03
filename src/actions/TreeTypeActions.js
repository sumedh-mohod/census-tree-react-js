import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_TREE_TYPE, DELETE_TREE_TYPE, EDIT_TREE_TYPE, GET_TREE_TYPE } from "./Types";

const GetTreeType = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-types?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TREE_TYPE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveTreeType = (page,limit,status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-types?page=${page}&limit=${limit}&status=${status}`);
      dispatch({
        type: GET_TREE_TYPE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchTreeType = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-types?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_TREE_TYPE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTreeType = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/tree-types",params);
      dispatch({
        type: ADD_TREE_TYPE,
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

  const EditTreeType = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/tree-types/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TREE_TYPE,
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

  const DeleteTreeType = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/tree-types/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_TREE_TYPE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetTreeType,
      GetActiveTreeType,
      SearchTreeType,
      AddTreeType,
      EditTreeType,
      DeleteTreeType
  }