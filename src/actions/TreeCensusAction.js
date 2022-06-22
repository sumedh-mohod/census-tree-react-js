import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_TREE_CENSUS, UPDATE_QC_STATUS_TREE_CENSUS } from "./Types";

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

export {
  GetTreeCensus,
  SearchTreeCensus,
  UpdateQCStatusOfTreeCensus,
}