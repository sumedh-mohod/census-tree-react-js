import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { ShowLoader } from './CommonAction';
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_TREE_CENSUS, UPDATE_QC_STATUS_TREE_CENSUS,  GET_TREE_CENSUS_HISTORY, GET_TREE_CENSUS_PENDING_QC_STATUS, UPDATE_CENSUS_TREE, REFER_TO_EXPERT, DELETE_TREE_CENSUS} from "./Types";

const GetTreeCensus = (page,limit,council,zone,ward,addedByForm,treeNameFrom,heightFrom,heightTo, girthFrom,girthTo,fromDateForm, toDateForm) => async (dispatch) => {
  let url = `/api/census-trees?page=${page}&limit=${limit}`
  if(council){
    url = `${url}&where[council_id]=${council}`;
  }
  if(zone){
    url = `${url}&where[zone_id]=${zone}`;
  }
  if(ward){
    url = `${url}&where[ward_id]=${ward}`
  } if(addedByForm){
    url = `${url}&where[added_by_id]=${addedByForm}`
  } if(treeNameFrom){
    url = `${url}&where[tree_name_id]=${treeNameFrom}`
  }if(heightFrom){
    url = `${url}&height_from=${heightFrom}`
  }if(heightTo){
    url = `${url}&height_to=${heightTo}`
  }if(girthFrom){
    url = `${url}&girth_from=${girthFrom}`
  }if(girthTo){
    url = `${url}&girth_to=${girthTo}`
  }
  if(fromDateForm && toDateForm){
    url = `${url}&from_date=${fromDateForm.split('-').reverse().join('-')}&to_date=${toDateForm.split('-').reverse().join('-')}`
  }

  try {
    const response = await JWTServer.get(`${url}`);
    dispatch({
      type: GET_TREE_CENSUS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_TREE_CENSUS,
      payload: {data:{data:[], last_page:0}},
    });
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};


const SearchTreeCensus = (page,limit,council,zone,ward,searchValue) => async (dispatch) => {

  let url = `/api/census-trees?page=${page}&limit=${limit}`
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
      type: GET_TREE_CENSUS,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const GetTreeCensusHistory = (params,page,limit) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/census-trees/history/${params}?page=${page}&limit=${limit}`);
    // console.log('GetTreeCensusHistory',response);
    dispatch({
      type:  GET_TREE_CENSUS_HISTORY,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const SearchTreeCensusHistory = (params,page,limit,searchValue) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/census-trees/history/${params}?page=${page}&limit=${limit}&search=${searchValue}`);
    // console.log('SearchTreeCensusHistory',response);
    dispatch({
      type: GET_TREE_CENSUS_HISTORY,
      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const UpdateQCStatusOfTreeCensus = (id,params) => async (dispatch) => {
  try {
    const response = await JWTServer.post(`/api/census-trees/qc/${id}`,params);
    dispatch({
      type: UPDATE_QC_STATUS_TREE_CENSUS,
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

const UpdateCensusTree = (params, id) => async (dispatch) => {
  // console.log("UPDATE CENSUS PARAMS",params);
  try {
    const response = await JWTServer.put(`/api/census-trees/${id}`,params);
    // console.log("Update Census Tree",response.data);
    dispatch({
      type: UPDATE_CENSUS_TREE,
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

const ReferToExpert = (params,id) => async (dispatch) => {
  try {
    const response = await JWTServer.post(`/api/census-trees/referred-to-expert/${id}`,params);
    // console.log("Refer to expert Census Tree",response.data);
    dispatch({
      type: REFER_TO_EXPERT,
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

const GetTreeCensusPendingQCStatus = (councilId, zoneId, wardId, fromDate, toDate,addedBy,checked) => async (dispatch) => {

  // console.log("ADDED BY",addedBy);
  let url = `/api/census-trees/qc/pending`
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
  if(checked){
    url = `${url}&where[is_heritage]=${checked}`
  }
    
 
 

  try {
    const response = await JWTServer.get(`${url}`);
    // console.log(response)
    dispatch({
      type: GET_TREE_CENSUS_PENDING_QC_STATUS,
      payload: response.data,
    });
    dispatch(ShowLoader(false));
  } catch (e) {
    dispatch(ShowLoader(false));
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const DeleteCensusTrees = (params,status) => async (dispatch) => {
  try {
    const response = await JWTServer.delete(`/api/census-trees/${params}?status=${status}`);
    // console.log("DELETE STATE RESPONSE",response.data);
    dispatch({
      type: DELETE_TREE_CENSUS,
      payload: response.data,
    });
    dispatch(SetNewAlert({
      msg: "Census tree deleted successfully!",
      alertType: "success",
    }));
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

export {
  GetTreeCensus,
  SearchTreeCensus,
  GetTreeCensusHistory,
  SearchTreeCensusHistory,
  UpdateQCStatusOfTreeCensus,
  GetTreeCensusPendingQCStatus,
  UpdateCensusTree,
  ReferToExpert,
  DeleteCensusTrees
}