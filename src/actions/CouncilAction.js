import JWTServer from "../api/withJWTServer";
import formDataJWTServer from "../api/formDataJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_COUNCIL, DELETE_COUNCIL, EDIT_COUNCIL, GET_COUNCIL, GET_COUNCIL_BY_ID, GET_ACTIVE_COUNCIL } from "./Types";

const GetCouncil = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/councils?page=${page}&limit=${limit}`);
      // console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_COUNCIL,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetActiveCouncil = (status) => async (dispatch) => {
    // console.log('clicked me council');
    try {
      const response = await JWTServer.get(`/api/councils?status=${status}`);
      // console.log("Active Councils RESPONSE",response.data);
      dispatch({
        type: GET_ACTIVE_COUNCIL,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SetActiveCouncil = (obj) => async (dispatch) => {
    try {
      dispatch({
        type: GET_ACTIVE_COUNCIL,
        payload: obj,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const SearchCouncil = (page,limit,searchValue) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/councils?page=${page}&limit=${limit}&search=${searchValue}`);
      dispatch({
        type: GET_COUNCIL,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const GetCouncilById = (id) => async (dispatch) => {
    // console.log('id', id);
    try {
      const response = await JWTServer.get(`/api/councils/${id}`);
      // console.log("GET COUNCIL BY ID RESPONSE",response.data);
      dispatch({
        type: GET_COUNCIL_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddCouncil = (params) => async (dispatch) => {
      // console.log("PARAMS FOR COUNCIL",params);
    try {
      const response = await JWTServer.post("/api/councils",params);
      dispatch({
        type: ADD_COUNCIL,
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

  const AddCouncilWithLogo = (logoParams,councilParams) => async (dispatch) => {
  try {
    const logoResponse = await formDataJWTServer.post("/api/upload-image", logoParams);
    const path = logoResponse.data.data.url;
    
    const {council} = councilParams;
    council.logo = path;
    councilParams.council = council;
    const response = await JWTServer.post("/api/councils",councilParams);
    dispatch({
      type: ADD_COUNCIL,
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

  const EditCouncil = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/councils/${districtsId}`,params);
      // console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_COUNCIL,
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

  const EditCouncilWithLogo = (logoParams,councilParams,districtsId) => async (dispatch) => {
    try {
      const logoResponse = await formDataJWTServer.post("/api/upload-image", logoParams);
    const path = logoResponse.data.data.url;
    
    const {council} = councilParams;
    council.logo = path;
    councilParams.council = council;
      const response = await JWTServer.put(`/api/councils/${districtsId}`,councilParams);
      // console.log("EDIT STATE RESPONSE",response.data);
      dispatch({
        type: EDIT_COUNCIL,
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

  const DeleteCouncil = (params,status) => async (dispatch) => {
    try {
      const response = await JWTServer.delete(`/api/councils/${params}?status=${status}`);
      // console.log("DELETE STATE RESPONSE",response.data);
      dispatch({
        type: DELETE_COUNCIL,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  export {
      GetCouncil,
      GetActiveCouncil,
      SetActiveCouncil,
      SearchCouncil,
      AddCouncil,
      AddCouncilWithLogo,
      EditCouncil,
      EditCouncilWithLogo,
      DeleteCouncil,
      GetCouncilById
  }