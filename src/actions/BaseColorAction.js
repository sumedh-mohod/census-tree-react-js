import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ShowLoader } from './CommonAction';
import { DELETE_BASE_COLOR_TREES, GET_BASE_COLOR_TREES, GET_BASE_COLOR_TREES_HISTORY, GET_QC_REMARKS_FOR_BASE_COLOR, UPDATE_QC_STATUS_BASE_COLOR_TREES,
GET_BASE_COLOR_PENDING_QC_STATUS, UPDATE_BASE_COLOR_TREE } from "./Types";

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

  const GetBaseColorTreeHistory = (params,page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/base-color-trees/history/${params}?page=${page}&limit=${limit}`);
      dispatch({
        type: GET_BASE_COLOR_TREES_HISTORY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchBaseColorTreeHistory = (params,page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/base-color-trees/history/${params}?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_BASE_COLOR_TREES_HISTORY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteBaseColorTrees = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/base-color-trees/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
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
      // console.log("QCREMARKS RESPONSE",response.data);
      dispatch({
        type: GET_QC_REMARKS_FOR_BASE_COLOR,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetBaseColorPendingQCStatus = (councilId, zoneId, wardId, fromDate, toDate,addedBy) => async (dispatch) => {
    
    
    let url = `/api/base-color-trees/qc/pending`;
    if(councilId){
      url = `${url}?where[council_id]=${councilId}`;
    }
    if(zoneId){
      url = `${url}&where[zone_id]=${zoneId}`;
    }
    if(wardId){
      url = `${url}&where[ward_id]=${wardId}`
    }
    if(addedBy){
      url = `${url}&where[added_by_id]=${addedBy}`
    }
    if(fromDate && toDate){
      url = `${url}&where[from_date]=${fromDate}&where[to_date]=${toDate}`
    }
    try {
      const response = await JWTServer.get(`${url}`);
      // console.log(response);
      dispatch({
        type: GET_BASE_COLOR_PENDING_QC_STATUS,
        payload: response.data,
      });
      dispatch(ShowLoader(false));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const UpdateBaseColorTree = (params, id) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api//base-color-trees/${id}`,params);
      // console.log("Update Base color Tree",response.data);
      dispatch({
        type: UPDATE_BASE_COLOR_TREE,
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

  export {
      GetBaseColorTrees,
      AddBaseColorTrees,
      GetBaseColorTreeHistory,
      SearchBaseColorTreeHistory,
      SearchBaseColorTrees,
      DeleteBaseColorTrees,
      UpdateQCStatusOfBaseColorTrees,
      GetQcRemarksForBaseColor,
      GetBaseColorPendingQCStatus,
      UpdateBaseColorTree
  }