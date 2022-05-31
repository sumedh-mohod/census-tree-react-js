import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import DesignationReducer from "./DesignationReducer";
import MasterReducer from "./MasterReducer";
import PropertyTypeReducer from "./PropertyTypeReducer";
import TreeConditionReducer from "./TreeConditionReducer";
import TreeNameReducer from "./TreeNameReducer";
import TreeTypeReducer from "./TreeTypeReducer";
import WardsReducer from "./WardsReducer";
import ZoneReducer from "./ZoneReducer";


export default combineReducers({
  auth: AuthReducer,
  alerts:AlertReducer,
  master:MasterReducer,
  designations:DesignationReducer,
  treeType:TreeTypeReducer,
  treeName:TreeNameReducer,
  treeConditions:TreeConditionReducer,
  propertyTypes:PropertyTypeReducer,
  wards:WardsReducer,
  zones:ZoneReducer
});
