import { SET_ALERT, REMOVE_ALERT, RESET_STATE, SHOW_LOADER } from "../actions/Types";

const INIT_STATE = {
    showLoader:false
}

export default function CommonReducer (state = INIT_STATE, action)  {
  const { type, payload } = action;

  switch (type) {
   
    case SHOW_LOADER:
        return{
            ...state,
            showLoader: payload,
        }
    case RESET_STATE:
      return {...INIT_STATE};

    default:
      return state;
  }
};
