import JWTServer from "../api/withJWTServer";
import formDataJWTServer from "../api/formDataJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_PROPERTY_BY_COUNCIL_ID, IMPORT_PROPERTIES } from "./Types";
import { SetNewAlert } from "./AlertActions";

const GetPropertyByCouncilId = (councilId,page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/properties?where[council_id]=${councilId}&page=${page}&limit=${limit}`);
      dispatch({
        type: GET_PROPERTY_BY_COUNCIL_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchPropertyByCouncilId = (councilId,page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/properties?where[council_id]=${councilId}&page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_PROPERTY_BY_COUNCIL_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const ImportProperty = (params) => async (dispatch) => {
    try {
      const response = await formDataJWTServer.post("/api/properties/import-properties", params);
      dispatch({
        type: IMPORT_PROPERTIES,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      console.log("ERROR RESPONSE",e.response);
      if(e.response===422){
        console.log("ERRR");
      }
      else {
        dispatch(HandleExceptionWithSecureCatch(e));
      }
      
    }
  };

  
  export {
      GetPropertyByCouncilId,
      SearchPropertyByCouncilId,
      ImportProperty
  }