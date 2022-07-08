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

  const isContainPermission = (name) => {
    let found = false;
    userPermissions?.map((value,index)=>{
      if(value.name===name){
        found = true;
      }
      return null;
    })
    return found;
  }

  const dashObj = {
    title: 'Dashboard',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
  };
  navConfigArray.push(dashObj);


  if(isContainPermission("view-users")){
    const obj = {
      title: 'Users',
      path: '/dashboard/user',
      icon: getIcon('eva:people-fill'),
    }
    navConfigArray.push(obj);
  }

  if(isContainPermission("view-teams")){
    const obj =  {
      title: 'Teams',
      path: '/dashboard/teams',
      icon: getIcon('bxl:microsoft-teams'),
  }
    navConfigArray.push(obj);
  }
  // const obj =  {
  //   title: 'Master',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  //   children:[]}

  const outerObj =  {
      
    title: 'Master',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
    children:[]
    }

  if(isContainPermission("view-roles")){
 
      outerObj.children.push(
        {
          title: 'Roles',
          path: '/dashboard/role',
          icon: getIcon('eva:shopping-bag-fill'),
        }
      )
        
   
  //  navConfigArray.push(obj);
  }
  
  // const masterNav = navConfigArray[2].children;
  if(isContainPermission("view-designations")){
    const obj =   {
      title: 'Designations',
      path: '/dashboard/designation',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    
    outerObj.children.push(obj)
    // navConfigArray.push(obj);
  }

  if(isContainPermission("view-states")){
    const obj =   {
      title: 'States',
        path: '/dashboard/state',
        icon: getIcon('eva:shopping-bag-fill'),

    }
   
    outerObj.children.push(obj);
    //  navConfigArray.push(obj);
  }
  if(isContainPermission("view-districts")){
    const obj =   {
      title: 'Districts',
      path: '/dashboard/district',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-talukas")){
    const obj =   {
      title: 'Talukas',
      path: '/dashboard/taluka',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-zones")){
    const obj =   {
      title: 'Zones',
      path: '/dashboard/zone',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-wards")){
    const obj =   {
      title: 'Wards',
      path: '/dashboard/ward',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-councils")){
    const obj =   {
      title: 'Councils',
      path: '/dashboard/council',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-tree-types")){
    const obj =   {
      title: 'Tree Types',
      path: '/dashboard/type-of-tree',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  
  }
  if(isContainPermission("view-tree-conditions")){
    const obj =   {
      title: 'Tree Conditions',
      path: '/dashboard/tree-condition',
      icon: getIcon('eva:shopping-bag-fill'),    
    }
    
    outerObj.children.push(obj);
  }
  if(isContainPermission("view-tree-names")){
    const obj =   {
      title: 'Tree Names',
      path: '/dashboard/name-of-tree',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
   
  }
  if(isContainPermission("view-location-types")){
    const obj =   {
      title: 'Location Types',
      path: '/dashboard/location-type',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
   
  }
  if(isContainPermission("view-property-types")){
    const obj =   {
      title: 'Property Types',
      path: '/dashboard/type-of-property',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
   
  }
  if(isContainPermission("view-qc-remarks")){
    const obj =   {
      title: 'QC Remarks',
      path: '/dashboard/qc-remarks',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
 
  }
  if(isContainPermission("view-tree-diseases")){
    const obj =   {
      title: 'Tree Diseases',
      path: '/dashboard/treeDisease',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    outerObj.children.push(obj);
  }

  if(outerObj.children.length!==0){
    navConfigArray.push(outerObj);
  }

  const treeDataOuterObj =   {
    title: 'Trees Data',
    path: '/dashboard/tree-data',
    icon: getIcon('bi:tree-fill'),
    children:[]
  }

  if(isContainPermission("view-base-color-trees")){
    treeDataOuterObj.children.push(
    {
      title: 'Base Color',
      path: '/dashboard/base-color',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    )

  }
  if(isContainPermission("view-census-trees")){
    const obj =   {
      title: 'Census',
      path: '/dashboard/census',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }
  if(isContainPermission("view-denied-properties")){
    const obj =   {
      title: 'Denied Entries',
      path: '/dashboard/denied-entry',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }
  if(isContainPermission("view-no-tree-properties")){
    const obj =   {
      title: 'No Tree Properties',
      path: '/dashboard/no-tree-properties',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }
  if(isContainPermission("census-offsite-qc")){
    const obj =   {
      title: 'Census QC',
      path: '/dashboard/censusQC',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }
  if(isContainPermission("base-color-offsite-qc")){
    const obj =   {
      title: 'Base Color QC',
      path: '/dashboard/baseColorPendingQC',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }

  if(isContainPermission("view-trees-on-map")){
    treeDataOuterObj.children.push(
    {
      title: 'Trees on Map',
      path: '/dashboard/treeOnMap',
      icon: getIcon('eva:shopping-bag-fill'),
    })
  }
  if(isContainPermission("view-report")){
    const obj =   {
      title: 'Reports',
      path: '/dashboard/reports',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    treeDataOuterObj.children.push(obj);
  }

  if(treeDataOuterObj.children.length !==0){
    navConfigArray.push(treeDataOuterObj);
  }

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
