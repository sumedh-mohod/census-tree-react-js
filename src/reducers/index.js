import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";


export default combineReducers({
  auth: AuthReducer,
  alerts:AlertReducer
});
