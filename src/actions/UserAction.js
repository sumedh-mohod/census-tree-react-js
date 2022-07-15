import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_USER, DELETE_USER, EDIT_USER, GET_RELIGIONS, GET_SALARY_DEDUCTION_TYPES, GET_USER, GET_USER_BY_ID, GET_ACTIVE_USER, GET_USERS_BY_ROLEID, GET_USER_DOCUMENT_TYPES, SEARCH_USER, UNLINK_DEVICE } from "./Types";

const GetUsers = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/users?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveUsers = (status) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/users?status=${status}`);
      console.log("active users",response.data);
      dispatch({
        type: GET_ACTIVE_USER,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetUsersByRoleID = (roleid1, roleid2) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/users?role_id[]=${roleid1}&role_id[]=${roleid2}`);
      console.log("users by roles",response.data);
      dispatch({
        type: GET_USERS_BY_ROLEID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


  const GetUsersById = (userId) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/users/${userId}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchUsers = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/users?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddUsers = (params) => async (dispatch) => {
      console.log("ADD USER PARAMS",params);
    try {
      const response = await JWTServer.post("/api/users",params);
      dispatch({
        type: ADD_USER,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const EditUsers = (params,districtsId) => async (dispatch) => {
    console.log("EDIT USER PARAMS",params)
    try {
      const response = await JWTServer.put(`/api/users/${districtsId}`,params);
      dispatch({
        type: EDIT_USER,
        payload: response.data,
      });
      dispatch(SetNewAlert({
        msg: response.data.message,
        alertType: "success",
      }));
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const DeleteUsers = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/users/${params}?status=${status}`);
      dispatch({
        type: DELETE_USER,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetDeductionType = () => async (dispatch) => {
    try {
      const response = await JWTServer.get('/api/salary-deduction-types');
      dispatch({
        type: GET_SALARY_DEDUCTION_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetUserDocumentType = () => async (dispatch) => {
    try {
      const response = await JWTServer.get('/api/user-document-types');
      dispatch({
        type: GET_USER_DOCUMENT_TYPES,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetReligions = () => async (dispatch) => {
    try {
      const response = await JWTServer.get('/api/religions');
      dispatch({
        type: GET_RELIGIONS,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const UnlinkDevice = (params) => async (dispatch) => {
  try {
    const response = await JWTServer.post("/api/users/unlink-device",params);
    console.log("RESPONSE",response.data);
    dispatch({
      type: UNLINK_DEVICE,
      payload: response.data,
    });
    dispatch(SetNewAlert({
      msg: response.data.message,
      alertType: "success",
    }));
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

  export {
      GetUsers,
      GetUsersById,
      GetActiveUsers,
      GetUsersByRoleID,
      SearchUsers,
      AddUsers,
      EditUsers,
      DeleteUsers,
      GetDeductionType,
      GetUserDocumentType,
      GetReligions,
      UnlinkDevice
  }