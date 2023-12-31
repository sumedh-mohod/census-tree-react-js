import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ShowLoadingButton } from "./CommonAction";
import { ADD_TEAM, ASSIGN_CZW_TO_TEAM, ASSIGN_USERS_TO_TEAM, DELETE_ASSIGNED_CZW, DELETE_ASSIGNED_USER, DELETE_TEAM, EDIT_TEAM, GET_ACTIVE_TEAM, GET_CZW_BY_TEAM, GET_TEAM, GET_USERS_BY_TEAM } from "./Types";

const GetTeam = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/teams?page=${page}&limit=${limit}`);
      dispatch({
        type: GET_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetAllActiveTeam = () => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/teams?status=1`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_ACTIVE_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetMyActiveTeam = () => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/my-active-team`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetTeamByFilter = (page,limit,council,zone,ward) => async (dispatch) => {
    let url = `/api/teams?page=${page}&limit=${limit}`
    if(council){
      url = `${url}&council_id=${council}`;
    }
    if(zone){
      url = `${url}&zone_id=${zone}`;
    }
    if(ward){
      url = `${url}&ward_id=${ward}`
    }
    try {
      const response = await JWTServer.get(`${url}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchTeam = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/teams?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddTeam = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/teams",params);
      // console.log("ADD TEAM RESPONSE",response.data);
      dispatch({
        type: ADD_TEAM,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
      dispatch(ShowLoadingButton(false));
    } catch (e) {
      dispatch(ShowLoadingButton(false));
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditTeam = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/teams/${districtsId}`,params);
      // console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_TEAM,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      dispatch(ShowLoadingButton(true))
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteTeam = (params,status) => async (dispatch) => {
      // console.log("DElET STATUS",status);
    try {
      const response = await JWTServer.delete(`/api/teams/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetCZWByTeam = (teamId,page,limit) => async (dispatch) => {
    // console.log("TEAM ID",teamId);
    try {
      const response = await JWTServer.get(`/api/teams/assigned-czw/${teamId}?page=${page}&limit=${limit}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_CZW_BY_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_CZW_BY_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchCZWByTeam = (teamId,page,limit,searchValue) => async (dispatch) => {
    // console.log("TEAM ID",teamId);
    try {
      const response = await JWTServer.get(`/api/teams/assigned-czw/${teamId}?page=${page}&limit=${limit}&search=${searchValue}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_CZW_BY_TEAM,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: GET_CZW_BY_TEAM,
        payload: null,
      });
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddCZWToTeam = (params) => async (dispatch) => {
    try {
      const response = await JWTServer.post("/api/teams/assign-czw",params);
      // console.log("ADD TEAM RESPONSE",response.data);
      dispatch({
        type: ASSIGN_CZW_TO_TEAM,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
      dispatch(ShowLoadingButton(false));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
      dispatch(ShowLoadingButton(false));
    }
  };

  const DeleteCZWFromTeam = (params,status) => async (dispatch) => {
    try {
        const response = await JWTServer.delete(`/api/teams/assigned-czw/${params}?status=${status}`);
        // console.log("DELETE STATE RESPONSE",response.data);
        dispatch({
        type: DELETE_ASSIGNED_CZW,
        payload: response.data,
        });
    } catch (e) {
        dispatch(HandleExceptionWithSecureCatch(e));
    }
};

const GetUserByTeam = (teamId,page,limit) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/teams/assigned-users/${teamId}?page=${page}&limit=${limit}`);
    // console.log("DESIGNATIONS RESPONSE",response.data);
    dispatch({
      type: GET_USERS_BY_TEAM,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_BY_TEAM,
      payload: null,
    });
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const SearchUserByTeam = (teamId,page,limit,search) => async (dispatch) => {
  try {
    const response = await JWTServer.get(`/api/teams/assigned-users/${teamId}?page=${page}&limit=${limit}&search=${search}`);
    // console.log("DESIGNATIONS RESPONSE",response.data);
    dispatch({
      type: GET_USERS_BY_TEAM,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_BY_TEAM,
      payload: null,
    });
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

const AddUserToTeam = (params) => async (dispatch) => {
  // console.log("ADD USER TO TEAM PARAMS",params);
  try {
    const response = await JWTServer.post("/api/teams/assign-users",params);
    // console.log("ADD TEAM RESPONSE",response.data);
    dispatch({
      type: ASSIGN_USERS_TO_TEAM,
      payload: response.data,
    });
    dispatch(SetNewAlert({
      msg: response.data.message,
      alertType: "success",
    }));
    dispatch(ShowLoadingButton(false));
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
    dispatch(ShowLoadingButton(false));
  }
};

const DeleteUserFromTeam = (params,status) => async (dispatch) => {
  try {
      const response = await JWTServer.delete(`/api/teams/assigned-users/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
      type: DELETE_ASSIGNED_USER,
      payload: response.data,
      });
  } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
  }
};

  export {
      GetTeam,
      GetAllActiveTeam,
      GetMyActiveTeam,
      GetTeamByFilter,
      SearchTeam,
      AddTeam,
      EditTeam,
      DeleteTeam,
      GetCZWByTeam,
      SearchCZWByTeam,
      AddCZWToTeam,
      DeleteCZWFromTeam,
      GetUserByTeam,
      SearchUserByTeam,
      AddUserToTeam,
      DeleteUserFromTeam
  }