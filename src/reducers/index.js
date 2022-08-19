import { combineReducers } from "redux";
import AlertReducer from "./AlertReducer";
import AuthReducer from "./AuthReducer";
import CouncilReducer from "./CouncilReducer";
import DesignationReducer from "./DesignationReducer";
import MasterReducer from "./MasterReducer";
import PropertyTypeReducer from "./PropertyTypeReducer";
import LocationTypeReducer from './LocationTypeReducer';
import QcRemarksReducer from './QcRemarksReducer'
import RoleReducer from "./RoleReducer";
import TeamReducer from "./TeamReducer";
import TreeConditionReducer from "./TreeConditionReducer";
import TreeNameReducer from "./TreeNameReducer";
import TreeTypeReducer from "./TreeTypeReducer";
import UploadReducer from "./UploadReducer";
import UserReducer from "./UserReducer";
import WardsReducer from "./WardsReducer";
import ZoneReducer from "./ZoneReducer";
import BaseColorReducer from "./BaseColorReducer";
import PropertyReducer from "./PropertyReducer";
import DeniedEntryReducer from "./DeniedEntryReducer";
import CommonReducer from "./CommonReducer";
import TreeCensusReducer from './TreeCensusReducer';
import TreeDiseaseReducer from './TreeDiseaseReducer';
import NoTreePropertyReducer from "./NoTreePropertyReducer";
import TreeOnMapReducer from "./TreeOnMapReducer";
import ReportsReducer from './ReportsReducer';
import TreeFamilyReducer from "./TreeFamilyReducer";


export default combineReducers({
  auth: AuthReducer,
  alerts:AlertReducer,
  master:MasterReducer,
  designations:DesignationReducer,
  treeType:TreeTypeReducer,
  treeName:TreeNameReducer,
  treeConditions:TreeConditionReducer,
  propertyTypes:PropertyTypeReducer,
  qcRemarksTypes:QcRemarksReducer,
  locationTypes:LocationTypeReducer,
  wards:WardsReducer,
  zones:ZoneReducer,
  council:CouncilReducer,
  teams:TeamReducer,
  roles:RoleReducer,
  users:UserReducer,
  upload:UploadReducer,
  baseColor:BaseColorReducer,
  treeCensus:TreeCensusReducer,
  noTreeProperty:NoTreePropertyReducer,
  properties:PropertyReducer,
  deniedEntry:DeniedEntryReducer,
  treeDisease:TreeDiseaseReducer,
  common:CommonReducer,
  treeLocation:TreeOnMapReducer,
  reports: ReportsReducer,
  treeFamily: TreeFamilyReducer,
});
