
import { SHOW_LOADER } from "./Types";

const ShowLoader = (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADER,
      payload: data,
    });
  };

export { 
    ShowLoader
};
