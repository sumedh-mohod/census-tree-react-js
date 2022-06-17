import { Navigate, useRoutes } from 'react-router-dom';
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
import Register from './pages/Register';
import NewUserForm from './pages/NewUserForm';
import LocationType from './pages/Master/LocationType';
import TreeDensity from './pages/Master/TreeDensity';
import ViewUser from './pages/Users/ViewUser';
import QcRemarks from './pages/Master/QcRemarks';
import ViewProperties from './pages/Master/ViewProperties';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <DashboardApp /> },
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
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}