import JWTServer from "../api/withJWTServer";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_PROPERTY_BY_COUNCIL_ID } from "./Types";

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

  
  export {
      GetPropertyByCouncilId,
      SearchPropertyByCouncilId
  }