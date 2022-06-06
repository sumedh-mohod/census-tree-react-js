// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
      title: 'Teams',
      path: '/dashboard/teams',
      icon: getIcon('eva:shopping-bag-fill'),

  },
  {
    title: 'Master',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    children:[
        {
        title: 'Districts',
        path: '/dashboard/district',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'States',
        path: '/dashboard/state',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Talukas',
        path: '/dashboard/taluka',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Designations',
        path: '/dashboard/createDesignation',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Roles',
        path: '/dashboard/createRole',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Councils',
        path: '/dashboard/createCouncil',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Type Of Trees',
        path: '/dashboard/typeOfTree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Name Of Trees',
        path: '/dashboard/nameOfTree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Conditions',
        path: '/dashboard/treeCondition',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Type Of Properties',
        path: '/dashboard/typeOfProperty',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      // {
      //   title: 'Type Of House',
      //   path: '/dashboard/typeOfHouse',
      //   icon: getIcon('eva:shopping-bag-fill'),
      // },
      {
        title: 'Zones',
        path: '/dashboard/zone',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Wards',
        path: '/dashboard/ward',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      
    ]
},
{
  title: 'Tree Data',
  path: '/dashboard/tree-data',
  icon: getIcon('bi:tree-fill'),
  children:[
    {
      title: 'Base Color',
      path: '/dashboard/base-color',
      icon: getIcon('eva:shopping-bag-fill'),
    },
    {
      title: 'Census',
      path: '/dashboard/census',
      icon: getIcon('eva:shopping-bag-fill'),
    },{
      title: 'Denied Entry',
      path: '/dashboard/denied-entry',
      icon: getIcon('eva:shopping-bag-fill'),
    },
  ]
},
];

export default navConfig;
