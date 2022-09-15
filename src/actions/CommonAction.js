
import { SHOW_LOADER, SHOW_LOADER_BUTTON } from "./Types";

const ShowLoader = (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
      payload: data,
    });
  };

  const ShowLoadingButton = (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADER_BUTTON,
      payload: data,
    });
  };


export { 
    ShowLoader,
    ShowLoadingButton,
};
