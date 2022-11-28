import { GET_DASHBORAD_BY_COUNCIL_ID, GET_TEAMS_BY_COUNCIL_ID } from '../actions/Types';

const INIT_STATE = {
  council_records: null,
  overall_records: null,
};

export default function DashboardReducer(state = INIT_STATE, action) {
  const { type, payload } = action;
    console.log("DashboardReducer", payload);
  switch (type) {
    case GET_DASHBORAD_BY_COUNCIL_ID:
      return {
        ...state,
        dashboardCouncil: payload?.data,
      };
    // case GET_TEAMS_BY_COUNCIL_ID:
    //   return { dashboardCouncilTeams: payload?.data };

    default:
      return state;
  }
}
