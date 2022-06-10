import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { DELETE_BASE_COLOR_TREES, GET_BASE_COLOR_TREES, GET_QC_REMARKS_FOR_BASE_COLOR, UPDATE_QC_STATUS_BASE_COLOR_TREES } from "./Types";

const GetBaseColorTrees = (page,limit,council,zone,ward) => async (dispatch) => {

    let url = `/api/base-color-trees?page=${page}&limit=${limit}`
    if(council){
      url = `${url}&where[council_id]=${council}`;
    }
    if(zone){
      url = `${url}&where[zone_id]=${zone}`;
    }
    if(ward){
      url = `${url}&where[ward_id]=${ward}`
    }

    try {
      const response = await JWTServer.get(`${url}`);
      dispatch({
        type: GET_BASE_COLOR_TREES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  const SearchBaseColorTrees = (page,limit,council,zone,ward,searchValue) => async (dispatch) => {

    let url = `/api/base-color-trees?page=${page}&limit=${limit}`
    if(council){
      url = `${url}&where[council_id]=${council}`;
    }
    if(zone){
      url = `${url}&where[zone_id]=${zone}`;
    }
    if(ward){
      url = `${url}&where[ward_id]=${ward}`
    }

    url=`${url}&search=${searchValue}`

    try {
      const response = await JWTServer.get(`${url}`);
      dispatch({
        type: GET_BASE_COLOR_TREES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddBaseColorTrees = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/base-color-trees",params);
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetBaseColorTreeById = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/base-color-trees/${params}`);
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteBaseColorTrees = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/base-color-trees/${params}?status=${status}`);
      console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_BASE_COLOR_TREES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const UpdateQCStatusOfBaseColorTrees = (id,params) => async (dispatch) => {
    try {
      const response = await JWTServer.post(`/api/base-color-trees/qc/${id}`,params);
      dispatch({
        type: UPDATE_QC_STATUS_BASE_COLOR_TREES,
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

  const GetQcRemarksForBaseColor = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/qc-remarks?where[remark_for]=${params}`);
      console.log("QCREMARKS RESPONSE",response.data);
      dispatch({
        type: GET_QC_REMARKS_FOR_BASE_COLOR,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetBaseColorTrees,
      AddBaseColorTrees,
      GetBaseColorTreeById,
      SearchBaseColorTrees,
      DeleteBaseColorTrees,
      UpdateQCStatusOfBaseColorTrees,
      GetQcRemarksForBaseColor
  }