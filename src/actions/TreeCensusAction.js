import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_TREE_CENSUS, UPDATE_QC_STATUS_TREE_CENSUS,  GET_TREE_CENSUS_HISTORY, GET_TREE_CENSUS_PENDING_QC_STATUS} from "./Types";

const GetTreeCensus = (page,limit,council,zone,ward) => async (dispatch) => {

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

const GetTreeCensusPendingQCStatus = (councilId, zoneId, wardId, fromDate, toDate) => async (dispatch) => {

  const url =  `/api/census-trees/qc/pending?where[council_id]=${councilId}&where[zone_id]=${zoneId}&where[ward_id]=${wardId}&where[from_date]=${fromDate}&where[to_date]=${toDate}`
 

  try {
    const response = await JWTServer.get(`${url}`);
    dispatch({
      type: GET_TREE_CENSUS_PENDING_QC_STATUS,
      payload: response.data,
    });
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
}