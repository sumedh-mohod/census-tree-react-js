import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import {  GET_DENIED_ENTRY } from "./Types";

const GetDeniedEntry = (page,limit,council,zone,ward) => async (dispatch) => {

    let url = `/api/denied-properties?page=${page}&limit=${limit}`
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
        type: GET_DENIED_ENTRY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  const SearchDeniedEntry = (page,limit,council,zone,ward,searchValue) => async (dispatch) => {

    let url = `/api/denied-properties?page=${page}&limit=${limit}`
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
        type: GET_DENIED_ENTRY,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  
  export {
      GetDeniedEntry,
      SearchDeniedEntry
  }