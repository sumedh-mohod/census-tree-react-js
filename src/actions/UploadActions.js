
import formDataJWTServer from "../api/formDataJWTServer";

import {
  UPLOAD_FILE, UPLOAD_IMAGE
} from "./Types";

import { HandleExceptionWithSecureCatch } from "./CombineCatch";
import { SetNewAlert } from "./AlertActions";



const UploadFile = (params,index) => async (dispatch) => {
    try {
      const response = await formDataJWTServer.post("/api/upload-file", params);
      // console.log("UPLOAD FILE RESPONSE",response.data);
      const uploadFile = response.data.data;

      uploadFile.index = index;
      dispatch({
        type: UPLOAD_FILE,
        payload: uploadFile,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };

  const UploadImage = (params) => async (dispatch) => {
    try {
      const response = await formDataJWTServer.post("/api/upload-image", params);
      // console.log("UPLOAD FILE RESPONSE",response.data);
      dispatch({
        type: UPLOAD_IMAGE,
        payload: response.data,
      });
    } catch (e) {
      dispatch(HandleExceptionWithSecureCatch(e));
    }
  };


export {
  UploadFile,
  UploadImage
};
