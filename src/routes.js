import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Taluka from './pages/Master/Taluka';
import District from './pages/Master/District'
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CreateDesignation from './pages/Master/CreateDesignation';
import CreateRole from './pages/Master/CreateRole';
import CreateCouncil from './pages/Master/CreateCouncil';
import TypeOfTree from './pages/Master/TypeOfTree';
import CreateNameOfTree from './pages/Master/CreateNameOfTree';
import TypeOfCuttingTree from './pages/Master/TypeOfCuttingTree';
import TypeOfProperty from './pages/Master/TypeOfProperty';
import TypeOfHouse from './pages/Master/TypeOfHouse';
import Zone from './pages/Master/Zone';
import Ward from './pages/Master/Ward';
import BaseColor from './pages/TreeData/BaseColor';
import DeniedEntry from './pages/TreeData/DeniedEntry';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'district', element: <District /> },
        { path: 'taluka', element: <Taluka /> },
        { path: 'createDesignation', element: <CreateDesignation /> },
        { path: 'createRole', element: <CreateRole /> },
        { path: 'createCouncil', element: <CreateCouncil /> },
        { path: 'typeOfTree', element: <TypeOfTree /> },
        { path: 'nameOfTree', element: <CreateNameOfTree /> },
        { path: 'typeOfTreeCutting', element: <TypeOfCuttingTree /> }, 
        { path: 'typeOfProperty', element: <TypeOfProperty /> },    
        { path: 'typeOfHouse', element: <TypeOfHouse /> },
        { path: 'zone', element: <Zone /> },
        { path: 'ward', element: <Ward /> },
        { path: 'base-color', element: <BaseColor /> },
        { path: 'denied-entry', element: <DeniedEntry /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
