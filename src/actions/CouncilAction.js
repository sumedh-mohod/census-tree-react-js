import JWTServer from "../api/withJWTServer";
import { SetNewAlert } from "./AlertActions";
import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { ADD_COUNCIL, DELETE_COUNCIL, EDIT_COUNCIL, GET_COUNCIL, GET_COUNCIL_BY_ID } from "./Types";

const GetCouncil = (page,limit) => async (dispatch) => {
    try {
      const response = await JWTServer.get(`/api/councils?page=${page}&limit=${limit}`);
      console.log("DESIGNATIONS RESPONSE",response.data);
      dispatch({
        type: GET_COUNCIL,
        payload: response.data,
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
    try {
      const response = await JWTServer.get(`/api/councils/${id}`);
      console.log("GET COUNCIL BY ID RESPONSE",response.data);
      dispatch({
        type: GET_COUNCIL_BY_ID,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const AddCouncil = (params) => async (dispatch) => {
      console.log("PARAMS FOR COUNCIL",params);
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

  const EditCouncil = (params,districtsId) => async (dispatch) => {
    try {
      const response = await JWTServer.put(`/api/councils/${districtsId}`,params);
      console.log("EDIT STATE RESPONSE",response.data);
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
      console.log("DELETE STATE RESPONSE",response.data);
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
      SearchCouncil,
      AddCouncil,
      EditCouncil,
      DeleteCouncil,
      GetCouncilById
  }