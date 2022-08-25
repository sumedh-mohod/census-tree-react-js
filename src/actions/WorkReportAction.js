import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_WORK_REPORTS } from "./Types";

const GetWorkReports = (reportType,formDate,toDate) => async (dispatch) => {

    let url = `/api/reports/work-reports?`
    if(reportType){
      url = `${url}report_type=${reportType}`;
    }
    if(formDate){
      url = `${url}&from_date=${formDate}`;
    }
    if(toDate){
      url = `${url}&to_date=${toDate}`
    }

    console.log("council123",reportType)
   
    try {
      const response = await JWTServer.get(`${url}`);
      console.log("payload.data", response.data)
      dispatch({
     
        type: GET_WORK_REPORTS,
        payload: response.data,
    
      });

    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
    GetWorkReports,
}