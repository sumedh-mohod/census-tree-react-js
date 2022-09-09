import { SET_ALERT, REMOVE_ALERT, RESET_STATE, REMOVE_SPECIFIC_ALERT } from "../actions/Types";

const INIT_STATE = []

export default function AlertReducer (state = INIT_STATE, action)  {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_SPECIFIC_ALERT:
      return state.filter((alt) => alt.id !== payload);

    case REMOVE_ALERT:
      return state.filter((alt) => alt.id === payload);

    case RESET_STATE:
      return [...INIT_STATE];

    default:
      return state;
  }
};
