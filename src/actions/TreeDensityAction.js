import Server from "../api";
import JWTServer from "../api/withJWTServer";

import {
  ADD_DISTRICTS,
  DELETE_DISTRICTS,
  EDIT_DISTRICTS,
  GET_DISTRICTS,
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { SetNewAlert } from "./AlertActions";

const GetAllDistricts = (page,limit) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/districts?page=${page}&limit=${limit}`);
    console.log("DISTRICTS RESPONSE",response.data);
    dispatch({
      type: GET_DISTRICTS,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const GetActiveDistricts = (page,limit,status) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/districts?page=${page}&limit=${limit}&status=${status}`);
    dispatch({
      type: GET_DISTRICTS,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

    const SearchDistricts = (page,limit,searchValue) => async (dispatch) => {
      try {
        const response = await JWTServer.get(`/api/districts?page=${page}&limit=${limit}&search=${searchValue}`);
        dispatch({
          type: GET_DISTRICTS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    // const GetActiveDistrictsByStateId = (params,page,limit,status) => async (dispatch) => {
    //   console.log("GET DISTRICT BY STATE ID",params);
    //   try {
    //     const response = await JWTServer.get(`/api/districts?state_id=${params}&page=${page}&limit=${limit}&status=${status}`);
    //     console.log("DISTRICTS BY ID RESPONSE",response.data);
    //     dispatch({
    //       type: GET_DISTRICTS,
    //       payload: response.data,
    //     });
    //   } catch (e) {
    //     dispatch(HandleExceptionWithSecureCatch(e));
    //   }
    // };

    const AddDistricts = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.post("/api/districts",params);
        dispatch({
          type: ADD_DISTRICTS,
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

    const EditDistricts = (params,districtsId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/districts/${districtsId}`,params);
        console.log("EDIT STATE RESPONSE",response.data);
        dispatch({
          type: EDIT_DISTRICTS,
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


export {
  GetAllDistricts,
  GetActiveDistricts,
  SearchDistricts,
//   GetDistrictsByStateId,
//   GetActiveDistrictsByStateId,
  AddDistricts,
  EditDistricts,
  DeleteDistricts,
};
