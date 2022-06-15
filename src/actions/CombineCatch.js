import { SetNewAlert } from "./AlertActions";
import { ShowLoader } from "./CommonAction";

const HandleExceptionWithSecureCatch = (exception) => {
  console.log("EXCEPTION",exception.response.data);
  return (dispatch, getState) => {

    const message = exception.response.data.message;
    const statusCode = exception.response.status;

    dispatch(SetNewAlert({
      msg: message,
      alertType: "danger",
    }));

    dispatch(ShowLoader(false))

    };
};

export { HandleExceptionWithSecureCatch };
