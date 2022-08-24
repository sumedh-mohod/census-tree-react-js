import Server from "../api";
import JWTServer from "../api/withJWTServer";

import {
  ADD_TREE_DISEASE,
  DELETE_TREE_DISEASE,
  EDIT_TREE_DISEASE,
  GET_TREE_DISEASE,
  GET_ACTIVE_TREE_DISEASE,
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { SetNewAlert } from "./AlertActions";




const GetAllTreeDisease = (page,limit) => async (dispatch) => {
      try {
        const response = await JWTServer.get(`api/tree-diseases?page=${page}&limit=${limit}`);
        // console.log("GET STATE RESPONSE",response.data);
        dispatch({
          type: GET_TREE_DISEASE,
          payload: response.data,
        });
      } catch (e) {

          // console.log("CATCH GET ALL STATE",e.response);
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

const GetActiveTreeDisease = (status) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`api/tree-diseases?status=${status}`);
    // console.log("active tree disease RESPONSE",response.data);
    dispatch({
      type: GET_ACTIVE_TREE_DISEASE,
      payload: response.data,
    });
  } catch (e) {

      // console.log("CATCH GET ALL TREE DISEASE",e.response);
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const SearchTreeDisease = (page,limit,searchValue) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`api/tree-diseases?page=${page}&limit=${limit}&search=${searchValue}`);
    dispatch({
      type: GET_TREE_DISEASE,
      payload: response.data,
    });
  } catch (e) {

      // console.log("CATCH GET ALL TREE DISEASE",e.response);
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const AddTreeDisease = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/tree-diseases",params);
      // console.log("ADD STATE RESPONSE",response.data);
      dispatch({
        type:  ADD_TREE_DISEASE,
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

    const EditTreeDisease = (params,stateId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/tree-diseases/${stateId}`,params);
        // console.log("EDIT STATE RESPONSE",response.data);
        dispatch({
          type: EDIT_TREE_DISEASE,
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

    const DeleteTreeDisease = (params,status) => async (dispatch) => {
      try {
        const response = await JWTServer.delete(`/api/tree-diseases/${params}?status=${status}`);
        // console.log("DELETE TREE DISEASE RESPONSE",response);
        dispatch({
          type: DELETE_TREE_DISEASE,
          payload: response.data,
        });

      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

export {
    GetAllTreeDisease,
    GetActiveTreeDisease,
    SearchTreeDisease,
    AddTreeDisease,
    EditTreeDisease,
    DeleteTreeDisease
};
