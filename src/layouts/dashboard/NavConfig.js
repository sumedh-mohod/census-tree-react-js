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
      title: 'Team',
      path: '/dashboard/teams',
      icon: getIcon('eva:shopping-bag-fill'),

  },
  {
    title: 'Master',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    children:[
        {
        title: 'District',
        path: '/dashboard/district',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'State',
        path: '/dashboard/state',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Taluka',
        path: '/dashboard/taluka',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Create Designation',
        path: '/dashboard/createDesignation',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Create Role',
        path: '/dashboard/createRole',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Create Council',
        path: '/dashboard/createCouncil',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Type Of Tree',
        path: '/dashboard/typeOfTree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Name Of Tree',
        path: '/dashboard/nameOfTree',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Tree Condition',
        path: '/dashboard/treeCondition',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Type Of Property',
        path: '/dashboard/typeOfProperty',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Type Of House',
        path: '/dashboard/typeOfHouse',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Zone',
        path: '/dashboard/zone',
        icon: getIcon('eva:shopping-bag-fill'),
      },
      {
        title: 'Ward',
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
