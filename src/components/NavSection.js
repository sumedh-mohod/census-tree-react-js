import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({ item, active }) {
  const theme = useTheme();

  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};



export default function NavSection({ navConfig, ...other }) {
  const { pathname } = useLocation();
  const loggedUser = useSelector(state=> state.auth.loggedUser);
  const navConfigArray = [];
  console.log(loggedUser);
  console.log(loggedUser.roles[0].permissions);
  const userPermissions = loggedUser.roles[0].permissions;
  const dashObj = {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  };
  navConfigArray.push(dashObj);


  userPermissions.map((item, index)=>{
  if(item.name === "view-users"){
    const obj = {
      title: 'Users',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
    }
    navConfigArray.push(obj);
  }

  if(item.name === "view-teams"){
    const obj =  {
      title: 'Teams',
      path: '/dashboard/teams',
      icon: getIcon('bxl:microsoft-teams'),
  }
    navConfigArray.push(obj);
  }
  const obj =  {
    title: 'Master',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    children:[]}

  if(item.name === "view-roles"){
    console.log("|||||");
    const obj2 =  {
      
          title: 'Roles',
          path: '/dashboard/role',
          icon: getIcon('eva:shopping-bag-fill'),
        }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    console.log("++++", obj.children);
   // navConfigArray.push(obj);
  }
  console.log("--------",obj);
  // const masterNav = navConfigArray[2].children;
  if(item.name === "view-designations"){
    const obj2 =   {
      title: 'Designations',
      path: '/dashboard/designation',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children.push(children2);
    
    // masterNav.push(teamsobj);
    // navConfigArray.push(obj);
  }
  console.log("::::::::::",obj);
  if(item.name === "view-states"){
    const obj2 =   {
      title: 'States',
        path: '/dashboard/state',
        icon: getIcon('eva:shopping-bag-fill'),

    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    // navConfigArray.push(obj);
  }
  if(item.name === "view-districts"){
    const obj2 =   {
      title: 'Districts',
      path: '/dashboard/district',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    // navConfigArray.push(obj);
  }
  if(item.name === "view-talukas"){
    const obj2 =   {
      title: 'Talukas',
      path: '/dashboard/taluka',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    // navConfigArray.push(obj);
  }
  if(item.name === "view-zones"){
    const obj2 =   {
      title: 'Zones',
      path: '/dashboard/zone',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    // navConfigArray.push(obj);
  }
  if(item.name === "view-wards"){
    const obj2 =   {
      title: 'Wards',
      path: '/dashboard/ward',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
   // navConfigArray.push(obj);
  }
  if(item.name === "view-councils"){
    const obj2 =   {
      title: 'Councils',
      path: '/dashboard/council',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    
  }
  if(item.name === "view-tree-types"){
    const obj2 =   {
      title: 'Tree Types',
      path: '/dashboard/type-of-tree',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
  
  }
  if(item.name === "view-tree-conditions"){
    const obj2 =   {
      title: 'Tree Conditions',
      path: '/dashboard/tree-condition',
      icon: getIcon('eva:shopping-bag-fill'),    
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    
  }
  if(item.name === "view-tree-names"){
    const obj2 =   {
      title: 'Tree Names',
      path: '/dashboard/name-of-tree',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
   
  }
  if(item.name === "view-location-types"){
    const obj2 =   {
      title: 'Location Types',
      path: '/dashboard/location-type',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
   
  }
  if(item.name === "view-property-types"){
    const obj2 =   {
      title: 'Property Types',
      path: '/dashboard/type-of-property',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
   
  }
  if(item.name === "view-qc-remarks"){
    const obj2 =   {
      title: 'QC Remarks',
      path: '/dashboard/qc-remarks',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
 
  }
  if(item.name === "view-tree-diseases"){
    const obj2 =   {
      title: 'Tree Diseases',
      path: '/dashboard/treeDisease',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    const children2 = obj.children;
    children2.push(obj2);
    obj.children = children2
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  if(item.name === "view-base-color-trees"){
    const obj =   {
      title: 'Trees Data',
  path: '/dashboard/tree-data',
  icon: getIcon('bi:tree-fill'),
  children:[
    {
      title: 'Base Color',
      path: '/dashboard/base-color',
      icon: getIcon('eva:shopping-bag-fill'),
    },
  ]
    }
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  if(item.name === "view-census-trees"){
    const obj =   {
      title: 'Census',
      path: '/dashboard/census',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  if(item.name === "view-denied-properties"){
    const obj =   {
      title: 'Denied Entries',
      path: '/dashboard/denied-entry',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  if(item.name === "view-no-tree-properties"){
    const obj =   {
      title: 'No Tree Properties',
      path: '/dashboard/no-tree-properties',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  if(item.name === "view-trees-on-map"){
    const obj =   {
      title: 'Map',
  path: '/dashboard/map',
  icon: getIcon('bxs:map'),
  children:[
    {
      title: 'Trees on Map',
      path: '/dashboard/treeOnMap',
      icon: getIcon('eva:shopping-bag-fill'),
    },
  ]

    }
    // masterNav.push(teamsobj);
    navConfigArray.push(obj);
  }
  return true;
})
  console.log(navConfigArray);
  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {navConfigArray.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
