import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_REPORTS } from "./Types";

const GetReports = (council,fromDate,toDate) => async (dispatch) => {

    let url = `/api/reports?`
    if(council){
      url = `${url}council_id=${council}`;
    }
    if(fromDate){
      url = `${url}&from_date=${fromDate}`;
    }
    if(toDate){
      url = `${url}&to_date=${toDate}`
    }

    console.log("council123",council)
   
    try {
      const response = await JWTServer.get(`${url}`);
      console.log("payload.data", response.data)
      dispatch({
     
        type: GET_REPORTS,
        payload: response.data,
    
      });

    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
    GetReports,
}