import { SetNewAlert } from "./AlertActions";
import { Logout, SessionExpired } from "./AuthActions";
import { ShowLoader } from "./CommonAction";

const HandleExceptionWithSecureCatch = (exception) => {
  // console.log("EXCEPTION",exception.response.data);
  return (dispatch, getState) => {

    const message = exception.response.data.message;
    const statusCode = exception.response.status;

    if(statusCode===401 && window.location.pathname!=="/login"){
      dispatch(SetNewAlert({
        msg: "Session Expired",
        alertType: "danger",
      }));
      dispatch(SessionExpired())
  
      dispatch(ShowLoader(false))
    }

    else {
      dispatch(SetNewAlert({
        msg: message,
        alertType: "danger",
      }));
  
      dispatch(ShowLoader(false))
    }

    };
};

export { HandleExceptionWithSecureCatch };
