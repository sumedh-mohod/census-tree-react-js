// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/home',
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
      icon: getIcon('bxl:microsoft-teams'),

  },
  {
    title: 'Master',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    children:[
      {
        title: 'Roles',
        path: '/dashboard/role',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Designations',
        path: '/dashboard/designation',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'States',
        path: '/dashboard/state',
        icon: getIcon('eva:shopping-bag-fill'),
      },
        {
        title: 'Districts',
        path: '/dashboard/district',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Talukas',
        path: '/dashboard/taluka',
        icon: getIcon('eva:shopping-bag-fill'),
      },
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
      {
        title: 'Councils',
        path: '/dashboard/council',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Types',
        path: '/dashboard/type-of-tree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Conditions',
        path: '/dashboard/tree-condition',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Names',
        path: '/dashboard/name-of-tree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Location Types',
        path: '/dashboard/location-type',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Property Types',
        path: '/dashboard/type-of-property',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Qc Remaks',
        path: '/dashboard/qc-remarks',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Density',
        path: '/dashboard/tree-density',
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
