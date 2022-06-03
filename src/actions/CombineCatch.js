import { SetNewAlert } from "./AlertActions";

const HandleExceptionWithSecureCatch = (exception) => {
  console.log("EXCEPTION",exception.response.data);
  return (dispatch, getState) => {

    const message = exception.response.data.message;
    const statusCode = exception.response.status;

    dispatch(SetNewAlert({
      msg: message,
      alertType: "danger",
    }));

    };
};

export { HandleExceptionWithSecureCatch };
