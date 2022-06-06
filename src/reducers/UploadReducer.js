import { RESET_STATE, UPLOAD_FILE } from "../actions/Types";
  
  const INIT_STATE = {
    uploadFileLog:false,
    uploadFile:{}
  };
  
  export default function UploadReducer (state = INIT_STATE, action)  {
    const { type, payload } = action;
  
    switch (type) {
        case UPLOAD_FILE:
          return{
              ...state,
              uploadFile: payload.data,
              uploadFileLog: !state.uploadFileLog
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  