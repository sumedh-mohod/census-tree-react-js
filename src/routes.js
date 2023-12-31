

import { Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Taluka from './pages/Master/Taluka';
import District from './pages/Master/District'
import StateListTable from './pages/Master/StateListTable'
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CreateDesignation from './pages/Master/CreateDesignation';
import CreateRole from './pages/Master/CreateRole';
import CreateCouncil from './pages/Master/CreateCouncil';
import TypeOfTree from './pages/Master/TypeOfTree';
import CreateNameOfTree from './pages/Master/CreateNameOfTree';
import TypeOfProperty from './pages/Master/TypeOfProperty';
import TypeOfHouse from './pages/Master/TypeOfHouse';
import Zone from './pages/Master/Zone';
import Ward from './pages/Master/Ward';
import BaseColor from './pages/TreeData/BaseColor';
import DeniedEntry from './pages/TreeData/DeniedEntry';
import BaseColorHistory from './pages/TreeData/BaseColorHistory';
import TreeConditions from './pages/Master/TreeConditions';
import TeamsList from './pages/Teams/TeamsList'
import AssignNewCouncilZoneWard from './pages/Teams/AssignNewCouncilZoneWard';
import AssignUser from './pages/Teams/AssignUser';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import TermsCondition from './pages/TermsCondition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Register from './pages/Register';
import NewUserForm from './pages/NewUserForm';
import LocationType from './pages/Master/LocationType';
import TreeDensity from './pages/Master/TreeDensity';
import ViewUser from './pages/Users/ViewUser';
import QcRemarks from './pages/Master/QcRemarks';
import ViewProperties from './pages/Master/ViewProperties';
import Census from './pages/TreeData/Census';
import TreeDisease from './pages/Master/TreeDisease';
import TreeCensusHistory from './pages/TreeData/TreeCensusHistory';
import NoTreeProperty from './pages/TreeData/NoTreeProperty';
import TreeOnMap from './pages/Map/TreeOnMap';
// import Reports from './pages/TreeData/Reports';
import NewUI from './pages/NewUI';
import BaseColorPendingQC from './pages/TreeData/BaseColorPendingQC';
import TreeFamilies from './pages/Master/TreeFamilies';
import WorkingReports from './pages/Reports/WorkingReports';
import TreeReports from './pages/Reports/TreeReports';
import Reports from './pages/TreeData/Reports';
import AssociateWithZeroTreeYesterday from "./pages/Dashboardsection/AssociateWithZeroTreeYesterday"
import YesterdayLoggedInAssociates from "./pages/Dashboardsection/YesterdayLoggedInAssociates"

// ----------------------------------------------------------------------

// export default function Router() {
//   return useRoutes([
    
   
//   ]);
// }

const routes = (isLogged) => [
  {
    path: '/dashboard',
    element: isLogged? <DashboardLayout />: <Navigate to="/" />,
    children: [
      { path: 'home', element: <DashboardApp /> },
      { path: 'home/associateWithZeroTreeYesterday/:Id', element: < AssociateWithZeroTreeYesterday /> },
      { path: 'home/yesterdayLoggedInAssociates/:Id', element: < YesterdayLoggedInAssociates /> },
      { path: 'user', element: <User /> },
      { path: 'user/edit-user/:userId', element: <NewUserForm /> },
      { path: 'user/view-user/:userId', element: <ViewUser /> },
      { path: 'products', element: <Products /> },
      { path: 'blog', element: <Blog /> },
      { path: 'district', element: <District /> },
      { path: 'state', element: <StateListTable /> },
      { path: 'taluka', element: <Taluka /> },
      { path: 'designation', element: <CreateDesignation /> },
      { path: 'role', element: <CreateRole /> },
      { path: 'council', element: <CreateCouncil /> },
      { path: 'council/properties/:councilId/:councilName', element: <ViewProperties /> },
      { path: 'type-of-tree', element: <TypeOfTree /> },
      { path: 'families', element: <TreeFamilies/> },
      { path: 'name-of-tree', element: <CreateNameOfTree /> },
      { path: 'tree-condition', element: <TreeConditions /> }, 
      { path: 'type-of-property', element: <TypeOfProperty /> },   
      { path: 'location-type', element: <LocationType /> }, 
      { path: 'tree-density', element: <TreeDensity /> },
      { path: 'qc-remarks', element: <QcRemarks /> },
      { path: 'type-of-house', element: <TypeOfHouse /> },
      { path: 'zone', element: <Zone /> },
      { path: 'ward', element: <Ward /> },
      { path: 'base-color', element: <BaseColor /> },
      { path: 'denied-entry', element: <DeniedEntry /> },
      { path: 'base-color/history/:baseColorId/:baseColorName', element: <BaseColorHistory /> },
      { path: 'teams', element: <TeamsList /> },
      { path: 'assignNewCouncilZoneWard/:teamId/:teamName', element: <AssignNewCouncilZoneWard /> },
      { path: 'assignUser/:teamId/:teamName', element: <AssignUser/> },
      { path: 'new-user-form', element: <NewUserForm/> },
      { path: 'census', element: <Census/> },
      { path: 'treeDisease', element: <TreeDisease/> },
      { path: 'treeCensus/history/:treeCensusId/:treeCensusName', element: <TreeCensusHistory/> },
      { path: 'no-tree-properties', element: <NoTreeProperty/> },
      { path: 'treeOnMap', element: <TreeOnMap /> },
      { path: 'censusQc', element: <NewUI/>},
      { path: 'baseColorPendingQC', element: <BaseColorPendingQC/>},
      { path: 'census-report', element: <Reports/>},
      {path: "workingReports", element: <WorkingReports/>},
      {path: "treeReports", element:<TreeReports/>}
    ],
  },
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: 'terms-&-conditions', element: <TermsCondition /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
];

export default routes;


