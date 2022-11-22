import JWTServer from '../api/withJWTServer';
import { HandleExceptionWithSecureCatch } from './CombineCatch';
import { GET_DASHBORAD_BY_COUNCIL_ID } from './Types';

const GetDashboardByCouncilId = (councilId)=>async(dispatch)=>{
    console.log('dashcouncilaction');
    try{
        const response = await JWTServer.get(`/api/dashboard-data?council_id=${councilId}`);
        console.log("dashboard_response_action", response.data);
        dispatch({
            type: GET_DASHBORAD_BY_COUNCIL_ID,
            payload: response.data,
          });
    }catch (e){
        console.log("error");
        // dispatch({
        //     type: GET_DASHBORAD_BY_COUNCIL_ID,
        //     payload: null,
        //   });
        dispatch(HandleExceptionWithSecureCatch(e));
        // console.log("dashboard_error", e);
    }
}

export { GetDashboardByCouncilId }