import { SetNewAlert } from "./AlertActions";

const HandleExceptionWithSecureCatch = (exception) => {
  return (dispatch, getState) => {
    let statusCode;
    const isDown = getState().common.isServerShut;
    if (exception.message === "Network Error") {
      if (!window.navigator.onLine) {
        statusCode = 13;
      }
      /* else {
                statusCode = 14;
            } */
    } else {
      statusCode = exception.response ? exception.response.status : 500;
    }

    const message = exception.response
      ? exception.response.data.message
      : "Couldn't Complete Your Request, Try Again Later!.";
    switch (statusCode) {
      case 13:
        if (isDown) {
          // dispatch(RemoveServerDown())
        }
        // dispatch(SetNoInternet());
        break;

      case 14:
        // dispatch(RemoveServerDown())
        // dispatch(LogOut());
        break;

      case 500:
        dispatch(
          SetNewAlert({ msg: "Kokoloco Server are busy", alertType: "danger" })
        );
        break;

      case 200:{
        const data = exception.response ? exception.response.data.warning : null;
        if (data) {
          dispatch(
            SetNewAlert({ msg: data, alertType: "danger-stay", toHold: true })
          );
        }
      }
        break;

      case 400:
        dispatch(SetNewAlert({ msg: message, alertType: "danger" }));
        break;

      case 404:
        dispatch(SetNewAlert({ msg: message, alertType: "danger" }));
        break;

      case 422:
        dispatch(SetNewAlert({ msg: message, alertType: "information" }));
        break;

      case 403:
        // if(message === "ACCOUNT_EXPIRED" || message === "ACCOUNT_DEACTIVATED") {
        //     dispatch(SetNewAlert({msg: "Your Account has Deactivated, Please Contact bielearn Team" , alertType: "information"}));
        //     var loggedUser = getState().auth.loggedUser;
        //     if(loggedUser){
        //         var reqObj = {
        //             userPhoneNum: getState().auth.loggedUsername,
        //             userDeviceToken: localStorage.getItem("notificationToken") || "reasonsrestrictyou!"
        //         }
        //         dispatch(LogOut(reqObj));
        //     }
        // }
        // else {
        //     dispatch(SetNewAlert({msg: message , alertType: "information"}));
        // }
        break;

      case 401:{
        dispatch(
          SetNewAlert({
            msg: "Session Expired, Please Login Again!",
            alertType: "information",
          })
        );
        const loggedU = getState().auth.loggedUser;
        if (loggedU) {
          // var reqObjQ = {
          //     userPhoneNum: getState().auth.loggedUsername,
          //     userDeviceToken: localStorage.getItem("notificationToken") || "reasonsrestrictyou!"
          // }
          // dispatch(LogOut(reqObjQ));
        }
      }
        break;

      case 409:
        dispatch(SetNewAlert({ msg: message, alertType: "information" }));
        break;

      default:
        dispatch(
          SetNewAlert({
            msg: "Couldn't Complete Your Request, Try Again Later!.",
            alertType: "danger",
          })
        );
        break;
    }
  };
};

export { HandleExceptionWithSecureCatch };
