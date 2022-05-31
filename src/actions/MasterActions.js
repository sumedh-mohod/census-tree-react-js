import Server from "../api";
import JWTServer from "../api/withJWTServer";

import {
  ADD_DISTRICTS,
    ADD_STATE,
  ADD_TALUKAS,
  DELETE_DISTRICTS,
  DELETE_STATE,
  DELETE_TALUKAS,
  EDIT_DISTRICTS,
  EDIT_STATE,
  EDIT_TALUKAS,
  GET_DISTRICTS, GET_STATE, GET_TALUKAS
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";




const GetAllState = () => async (dispatch) => {
      try {
        const response = await JWTServer.get("/api/states");
        console.log("GET STATE RESPONSE",response.data);
        dispatch({
          type: GET_STATE,
          payload: response.data,
        });
      } catch (e) {

          console.log("CATCH GET ALL STATE",e.response);
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

  const AddState = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.post("/api/states",params);
        console.log("ADD STATE RESPONSE",response.data);
        dispatch({
          type: ADD_STATE,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const EditState = (params,stateId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/states/${stateId}`,params);
        console.log("EDIT STATE RESPONSE",response.data);
        dispatch({
          type: EDIT_STATE,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const DeleteState = (params,status) => async (dispatch) => {
      try {
        const response = await JWTServer.delete(`/api/states/${params}?status=${status}`);
        console.log("DELETE STATE RESPONSE",response.data);
        dispatch({
          type: DELETE_STATE,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const GetAllDistricts = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.get("/api/districts");
        console.log("DISTRICTS RESPONSE",response.data);
        dispatch({
          type: GET_DISTRICTS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const GetDistrictsById = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.get("/api/districts/2");
        console.log("DISTRICTS BY ID RESPONSE",response.data);
        // dispatch({
        //   type: GET_DISTRICTS,
        //   payload: response.data,
        // });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const AddDistricts = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.post("/api/districts",params);
        dispatch({
          type: ADD_DISTRICTS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const EditDistricts = (params,districtsId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/districts/${districtsId}`,params);
        console.log("EDIT STATE RESPONSE",response.data);
        dispatch({
          type: EDIT_DISTRICTS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const DeleteDistricts = (params,status) => async (dispatch) => {
      try {
        const response = await JWTServer.delete(`/api/districts/${params}?status=${status}`);
        console.log("DELETE STATE RESPONSE",response.data);
        dispatch({
          type: DELETE_DISTRICTS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const GetAllTalukas = () => async (dispatch) => {
      try {
        const response = await JWTServer.get("/api/talukas");
        console.log("DISTRICTS RESPONSE",response.data);
        dispatch({
          type: GET_TALUKAS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const AddTalukas = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.post("/api/talukas",params);
        dispatch({
          type: ADD_TALUKAS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const EditTalukas = (params,districtsId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/talukas/${districtsId}`,params);
        console.log("EDIT STATE RESPONSE",response.data);
        dispatch({
          type: EDIT_TALUKAS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    const DeleteTalukas = (params,status) => async (dispatch) => {
      try {
        const response = await JWTServer.delete(`/api/talukas/${params}?status=${status}`);
        console.log("DELETE STATE RESPONSE",response.data);
        dispatch({
          type: DELETE_TALUKAS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };




export {
  GetAllState,
  AddState,
  EditState,
  DeleteState,
  GetAllDistricts,
  GetDistrictsById,
  AddDistricts,
  EditDistricts,
  DeleteDistricts,
  GetAllTalukas,
  AddTalukas,
  EditTalukas,
  DeleteTalukas,
};
