import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_SPECIFIC_TREE_LOCATION_DETAILS, GET_TREE_LOCATION } from "./Types";

const GetAllTreeLocation = (council,zone,ward,fromDate,toDate,treeNumber) => async (dispatch) => {

    let url = `api/get-locations/census-trees`
    if(council){
      url = `${url}?where[council_id]=${council}`;
    }
    if(treeNumber){
      url = `${url}&where[tree_number]=${treeNumber}`;
    }
    else {
      if(zone){
        url = `${url}&where[zone_id]=${zone}`;
      }
      if(ward){
        url = `${url}&where[ward_id]=${ward}`
      }
      if(fromDate && toDate){
        url = `${url}&where[from_date]=${fromDate}&where[to_date]=${toDate}`
      }
    }
    try {
      const response = await JWTServer.get(`${url}`);
      dispatch({
        type: GET_TREE_LOCATION,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetSpecificTreeInfo = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/census-trees/${params}`);
      dispatch({
        type: GET_SPECIFIC_TREE_LOCATION_DETAILS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export{
    GetAllTreeLocation,
    GetSpecificTreeInfo
  }