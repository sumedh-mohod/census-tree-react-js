import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { GET_WORK_REPORTS, GET_ALL_WORK_REPORTS, GET_WORK_TYPES_WORK_REPORTS } from "./Types";

const GetWorkReports = (reportType,userId,teamId,status,formDate,toDate, page,limit) => async (dispatch) => {

    let url = `/api/reports/work-reports?`
    if(reportType){
      url = `${url}report_type=${reportType}`;
    }
    if(userId){
      url = `${url}&user_id=${userId}`;
    }
    if(teamId){
      url = `${url}&team_id=${teamId}`;
    }
    if(status){
      url = `${url}&status=${status}`;
    }
    if(formDate){
      url = `${url}&from_date=${formDate.split('-').reverse().join('-')}`;
    }
    if(toDate){
      url = `${url}&to_date=${toDate.split('-').reverse().join('-')}`
    }

    // console.log("council123",reportType)
   
    try {
      const response = await JWTServer.get(`${url}&page=${page}&limit=${limit}`);
      // console.log("payload.data", response.data)
      dispatch({
     
        type: GET_WORK_REPORTS,
        payload: response.data,
    
      });

    } catch (e) {
      dispatch({
        type: GET_WORK_REPORTS,
        payload: {data:null},
    
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetWorkTypeWorkReports = (reportType,userId,teamId,status,formDate,toDate, page,limit,) => async (dispatch) => {

    let url = `/api/reports/work-reports?`
    if(reportType){
      url = `${url}report_type=${reportType}`;
    }
    // if(userId){
    //   url = `${url}&user_id=${userId}`;
    // }
    // if(teamId){
    //   url = `${url}&team_id=${teamId}`;
    // }
    // if(status){
    //   url = `${url}&status=${status}`;
    // }
    if(formDate){
      url = `${url}&from_date=${formDate.split('-').reverse().join('-')}`;
    }
    if(toDate){
      url = `${url}&to_date=${toDate.split('-').reverse().join('-')}`
    }

    // console.log("council123",reportType)
   
    try {
      const response = await JWTServer.get(`${url}&page=${page}&limit=${limit}`);
      // console.log("RESPONSE ____",response.data)
      dispatch({
     
        type: GET_WORK_TYPES_WORK_REPORTS,
        payload: response.data,
    
      });

    } catch (e) {
      dispatch({
        type: GET_WORK_TYPES_WORK_REPORTS,
        payload: {data:null},
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  const GetAllWorkReports = (reportType,userId,teamId,formDate,toDate) => async (dispatch) => {

    let url = `/api/reports/work-reports?`
    if(reportType){
      url = `${url}report_type=${reportType}`;
    }
    if(userId){
      url = `${url}&user_id=${userId}`;
    }
    if(teamId){
      url = `${url}&team_id=${teamId}`;
    }
    if(formDate){
      url = `${url}&from_date=${formDate.split('-').reverse().join('-')}`;
    }
    if(toDate){
      url = `${url}&to_date=${toDate.split('-').reverse().join('-')}`
    }

    // console.log("council123",reportType)
   
    try {
      const response = await JWTServer.get(`${url}`);
      // console.log("payload.data", response.data)
      dispatch({
     
        type: GET_ALL_WORK_REPORTS ,
        payload: response.data,
    
      });

    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  // const SearchWorkReports = (page,limit,reportType,fromDate, toDate,searchValue) => async (dispatch) => {

  //   let url = `/api/reports/work-reports?page=${page}&limit=${limit}`
  //   if(reportType){
  //     url = `${url}report_type=${reportType}`;
  //   }
  //   if(fromDate){
  //     url = `${url}&from_date=${fromDate}`;
  //   }
  //   if(toDate){
  //     url = `${url}&to_date=${toDate}`
  //   }

  //   url=`${url}&search=${searchValue}`

  //   try {
  //     const response = await JWTServer.get(`${url}`);
  //     console.log("payload", response.data)
  //     dispatch({
  //       type: GET_WORK_REPORTS,
  //       payload: response.data,
  //     });
  //   } catch (e) {
  //     dispatch(HandleExceptionWithSecureCatch(e));
  //   }
  // };

  const SearchWorkReports = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/reports/work-reports?page=${page}&limit=${limit}&search=${searchValue}`);
      // console.log(response.data)
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
    GetWorkTypeWorkReports,
    SearchWorkReports,
    GetAllWorkReports,
}