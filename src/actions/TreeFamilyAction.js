import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_TREE_FAMILY, DELETE_TREE_FAMILY, EDIT_TREE_FAMILY, GET_TREE_FAMILY, GET_ACTIVE_TREE_FAMILY } from "./Types";

const GetTreeFamily = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-families?page=${page}&limit=${limit}`);
      // console.log("Tree Family Action",response.data);
      dispatch({
        type: GET_TREE_FAMILY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  

  const GetActiveTreeFamily = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-families?status=${status}`);
      dispatch({
        type: GET_ACTIVE_TREE_FAMILY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchTreeFamily = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/tree-families?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_TREE_FAMILY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTreeFamily = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/tree-families",params);
      dispatch({
        type: ADD_TREE_FAMILY,
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

  const EditTreeFamily = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/tree-families/${districtsId}`,params);
      // console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TREE_FAMILY,
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

  const DeleteTreeFamily = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/tree-families/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_TREE_FAMILY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetTreeFamily,
      GetActiveTreeFamily,
      SearchTreeFamily,
      AddTreeFamily,
      EditTreeFamily,
      DeleteTreeFamily
  }