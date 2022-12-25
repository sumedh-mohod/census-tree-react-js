import JWTServer from '../api/withJWTServer';

import { SetNewAlert } from './AlertActions';

import { HandleExceptionWithSecureCatch } from './CombineCatch';

import { GET_WORK_LOGGED_BY_COUNCIL_ID } from './Types';

const GetWorkLogged = (council, date, page, limit) => async (dispatch) => {
  console.log('council, date, page, limit', council, date, page, limit);

 
  const url = `api/get-work-logs?council_id=${council}&date=${date}&page=${page}&limit=${limit}`;

  try {
    const response = await JWTServer.get(`${url}`);

    console.log('response ', response.data);

    dispatch({
      type: GET_WORK_LOGGED_BY_COUNCIL_ID,

      payload: response.data,
    });
  } catch (e) {
    dispatch(SetNewAlert({
        msg: e.response.data.message,
        alertType: "danger",
      }));
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

export { GetWorkLogged };
