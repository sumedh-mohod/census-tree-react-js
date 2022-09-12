import Server from "../api";
import JWTServer from "../api/withJWTServer";

import {
  ADD_QCREMARKS,
  DELETE_QCREMARKS,
  EDIT_QCREMARKS,
  GET_QCREMARKS,
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { SetNewAlert } from "./AlertActions";

const GetQcRemarks = (page,limit) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/qc-remarks?page=${page}&limit=${limit}`);
    // console.log("QCREMARKS RESPONSE",response.data);
    dispatch({
      type: GET_QCREMARKS,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const GetActiveQcRemarks = (page,limit,status) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/qc-remarks?page=${page}&limit=${limit}&status=${status}`);
    dispatch({
      type: GET_QCREMARKS,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

    const SearchQcRemarks = (page,limit,searchValue) => async (dispatch) => {
      try {
        const response = await JWTServer.get(`/api/qc-remarks?page=${page}&limit=${limit}&search=${searchValue}`);
        dispatch({
          type: GET_QCREMARKS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };

    // const GetDistrictsByStateId = (params,page,limit) => async (dispatch) => {
    //   console.log("GET DISTRICT BY STATE ID",params);
    //   try {
    //     const response = await JWTServer.get(`/api/districts?state_id=${params}&page=${page}&limit=${limit}`);
    //     console.log("DISTRICTS BY ID RESPONSE",response.data);
    //     dispatch({
    //       type: GET_DISTRICTS,
    //       payload: response.data,
    //     });
    //   } catch (e) {
    //     dispatch(HandleExceptionWithSecureCatch(e));
    //   }
    // };

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

    const AddQcRemarks = (params) => async (dispatch) => {
      try {
        const response = await JWTServer.post("/api/qc-remarks",params);
        dispatch({
          type: ADD_QCREMARKS,
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

    const EditQcRemarks = (params,districtsId) => async (dispatch) => {
      try {
        const response = await JWTServer.put(`/api/qc-remarks/${districtsId}`,params);
        // console.log("EDIT QCREMARKS RESPONSE",response.data);
        dispatch({
          type: EDIT_QCREMARKS,
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

    const DeleteQcRemarks = (params,status) => async (dispatch) => {
      try {
        const response = await JWTServer.delete(`/api/qc-remarks/${params}?status=${status}`);
        // console.log("DELETE QCREMARKS RESPONSE",response.data);
        dispatch({
          type: DELETE_QCREMARKS,
          payload: response.data,
        });
      } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
    };



export {
  GetQcRemarks,
  GetActiveQcRemarks,
  SearchQcRemarks,
  AddQcRemarks,
  EditQcRemarks,
  DeleteQcRemarks,
};
