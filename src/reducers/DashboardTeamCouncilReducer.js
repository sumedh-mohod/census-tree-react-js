import { GET_DASHBORAD_BY_COUNCIL_ID, GET_TEAMS_BY_COUNCIL_ID } from '../actions/Types';

const INIT_STATE = {
  dashboardCouncilTeams: []
};

export default function DashboardCouncilTeamReducer(state = INIT_STATE, action) {
  const { type, payload } = action;
    // console.log("DashboardCouncilTeamReducer", payload);

  switch (type) {
    case GET_TEAMS_BY_COUNCIL_ID:
      return { ...state,
        dashboardCouncilTeams: payload?.data };

    default:
      return state;
  }
}
