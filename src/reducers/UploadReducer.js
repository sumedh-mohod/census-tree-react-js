import { RESET_STATE, UPLOAD_FILE, UPLOAD_IMAGE } from "../actions/Types";
  
  const INIT_STATE = {
    uploadFileLog:false,
    uploadFile:{},
    uploadImage:{},
    uploadImageLog:false
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

        case UPLOAD_IMAGE:
          return{
              ...state,
              uploadImage: payload.data,
              uploadImageLog: !state.uploadImageLog
        };

        case RESET_STATE:
        return { ...INIT_STATE };

        default:
        return state;
    }
  };
  