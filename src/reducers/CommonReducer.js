import { SET_ALERT, REMOVE_ALERT, RESET_STATE, SHOW_LOADER, SHOW_LOADER_BUTTON } from "../actions/Types";

const INIT_STATE = {
    showLoader:false,
    showLoadingButton: false
}

export default function CommonReducer (state = INIT_STATE, action)  {
  const { type, payload } = action;

  switch (type) {
   
    case SHOW_LOADER:
        return{
            ...state,
            showLoader: payload,
        };
        case SHOW_LOADER_BUTTON:
          return{
              ...state,
              showLoadingButton: !state.showLoadingButton,
          }
    case RESET_STATE:
      return {...INIT_STATE};

    default:
      return state;
  }
};
