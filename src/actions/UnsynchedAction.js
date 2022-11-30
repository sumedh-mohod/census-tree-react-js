import JWTServer from '../api/withJWTServer';

import { SetNewAlert } from './AlertActions';

import { HandleExceptionWithSecureCatch } from './CombineCatch';

import { GET_UNSYNCHEDUSERS_BY_COUNCIL_ID } from './Types';

const GetUnsynchedUser = (council, page, limit) => async (dispatch) => {
  // console.log('page,limit,council', council, page, limit);

  // /unsynchedUsers?council_id=1&page=1&limit=10

  const url = `/api/unsynchedUsers?council_id=${council}&page=${page}&limit=${limit}`;

  // if(council){

  //   url = `${url}&council_id=${council}`;

  // }

  try {
    const response = await JWTServer.get(`${url}`);

    // console.log('response ', response.data);

    dispatch({
      type: GET_UNSYNCHEDUSERS_BY_COUNCIL_ID,

      payload: response.data,
    });
  } catch (e) {
    dispatch(HandleExceptionWithSecureCatch(e));
  }
};

export { GetUnsynchedUser };
