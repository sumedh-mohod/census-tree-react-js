import {  ADD_TEAM, ASSIGN_CZW_TO_TEAM, ASSIGN_USERS_TO_TEAM, DELETE_ASSIGNED_CZW, DELETE_ASSIGNED_USER, DELETE_DESIGNATIONS, DELETE_TEAM, EDIT_DESIGNATIONS, EDIT_TEAM, GET_ACTIVE_TEAM, GET_CZW_BY_TEAM, GET_DESIGNATIONS, GET_TEAM, GET_USERS_BY_TEAM, RESET_STATE } from "../actions/Types";
  
  const INIT_STATE = {
    teams:null,
    activeTeams:null,
    addTeamsLog:false,
    editTeamsLog:false,
    deleteTeamsLog:false,
    cwzOfTeam:null,
    assignCWZToTeamLog:false,
    deleteCWZFromteamLog:false,
    userOfTeam:null,
    assignUserToTeamLog:false,
    deleteUserFromteamLog:false,
    pageInfo:{}
  };
  
  export default function TeamReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case GET_TEAM:
          return{
              ...state,
              teams: payload?.data?.data || payload,
              pageInfo: payload?.data || {}
        };

        case GET_ACTIVE_TEAM:
          return{
              ...state,
              activeTeams: payload?.data || payload
        };

        case ADD_TEAM:
            return{
                ...state,
                addTeamsLog: !state.addTeamsLog,
        };

        case EDIT_TEAM:
            return{
                ...state,
                editTeamsLog: !state.editTeamsLog,
        };

        case DELETE_TEAM:
            return{
                ...state,
                deleteTeamsLog: !state.deleteTeamsLog,
        };

        case GET_CZW_BY_TEAM:
          return{
              ...state,
              cwzOfTeam: payload?.data?.data || payload,
              pageInfo: payload?.data || {}
        };

        case ASSIGN_CZW_TO_TEAM:
          return{
              ...state,
              assignCWZToTeamLog: !state.assignCWZToTeamLog,
        };
        case DELETE_ASSIGNED_CZW:
          return{
              ...state,
              deleteCWZFromteamLog: !state.deleteCWZFromteamLog,
        };

        case GET_USERS_BY_TEAM:
          return{
              ...state,
              userOfTeam: payload?.data?.data || payload,
              pageInfo: payload?.data || {}
        };

        case ASSIGN_USERS_TO_TEAM:
          return{
              ...state,
              assignUserToTeamLog: !state.assignUserToTeamLog,
        };
        case DELETE_ASSIGNED_USER:
          return{
              ...state,
              deleteUserFromteamLog: !state.deleteUserFromteamLog,
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  