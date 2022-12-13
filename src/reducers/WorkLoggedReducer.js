import {  GET_WORK_LOGGED_BY_COUNCIL_ID, RESET_STATE } from '../actions/Types';

const INIT_STATE = {
  pageInfo: {},

  workLogged: [],
};

export default function WorkLoggedReducer(state = INIT_STATE, action) {
  const { type, payload } = action;

  console.log('workLogged.........', payload);

  switch (type) {
    case  GET_WORK_LOGGED_BY_COUNCIL_ID:
      return {
        ...state,

        workLogged: payload.data,

        pageInfo: payload.data,
      };

    case RESET_STATE:
      return { ...INIT_STATE };

    default:
      return state;
  }
}
