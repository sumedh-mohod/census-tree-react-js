import {  GET_TEAM_DETAIL_BY_COUNCIL_TEAM_ID } from '../actions/Types';

const INIT_STATE = {
  dashboardTeamDetailbyCouncilTeamId: []
  };

export default function DashboardTeamDetailByIdReducer(state = INIT_STATE, action) {
  const { type, payload } = action;
    // console.log("DashboardTeamDetailByIdReducer", payload);

  switch (type) {
    case GET_TEAM_DETAIL_BY_COUNCIL_TEAM_ID:
      return { ...state,
        dashboardTeamDetailbyCouncilTeamId: payload?.data };

    default:
      return state;
  }
}
