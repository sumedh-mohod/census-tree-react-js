import JWTServer from '../api/withJWTServer';
import { HandleExceptionWithSecureCatch } from './CombineCatch';
import { GET_DASHBORAD_BY_COUNCIL_ID, GET_TEAMS_BY_COUNCIL_ID, GET_TEAM_DETAIL_BY_COUNCIL_TEAM_ID } from './Types';
import { ShowLoader } from './CommonAction';

const GetDashboardByCouncilId = (councilId)=>async(dispatch)=>{
    // console.log('dashcouncilaction');
    try{
        const response = await JWTServer.get(`/api/dashboard-data?council_id=${councilId}`);
        // console.log("dashboard_response_action", response.data);
        dispatch({
            type: GET_DASHBORAD_BY_COUNCIL_ID,
            payload: response.data,
          });
          dispatch(ShowLoader(false));
    }catch (e){
        // console.log("error");
        dispatch(ShowLoader(false));
        dispatch(HandleExceptionWithSecureCatch(e));
        // console.log("dashboard_error", e);
    }
}

const getTeamsByCouncilId = (councilId)=>async(dispatch)=>{
    // console.log("councilId", councilId, "call2");
    
    try{
        const response = await JWTServer.get(`/api/get-for-web-dashboard/teams?council_id=${councilId}`);
        dispatch({
            type: GET_TEAMS_BY_COUNCIL_ID,
            payload: response.data,
        });
        dispatch(ShowLoader(false));
    }catch(e){
        // dispatch({
        //     type: GET_TEAMS_BY_COUNCIL_ID,
        //     payload: [],
        // });
        dispatch(ShowLoader(false));
        dispatch(HandleExceptionWithSecureCatch(e));
    }
}

const getTeamDetailByCouncilTeam = (councilId, councilTeamChange) =>async(dispatch)=>{
    // console.log(".....getTeamDetailByCouncilTeam",  councilId,  councilTeamChange);
    try{
        const response = await JWTServer.get(`/api/last-tree-details/teams?council_id=${councilId}&id=${councilTeamChange}`);
        // console.log("calledresponse", response);
        dispatch({
            type: GET_TEAM_DETAIL_BY_COUNCIL_TEAM_ID,
            payload: response.data,
        })
        dispatch(ShowLoader(false));
    }catch(e){
        // dispatch({
        //     type: GET_TEAM_DETAIL_BY_COUNCIL_TEAM_ID,
        //     payload: [],
        // })
        dispatch(ShowLoader(false));
        dispatch(HandleExceptionWithSecureCatch(e));
    }
}

export { GetDashboardByCouncilId, getTeamsByCouncilId, getTeamDetailByCouncilTeam }