import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import {  GET_UNSYNCHEDUSERS_BY_COUNCIL_ID} from "./Types";


const GetUnsynchedUser = (council,page,limit,) => async (dispatch) => {
    const url = `/api/unsynchedUsers?council_id=${council}&page=${page}&limit=${limit}`

    try {
      const response = await JWTServer.get(`${url}`);
      dispatch({
        type: GET_UNSYNCHEDUSERS_BY_COUNCIL_ID ,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export { GetUnsynchedUser }