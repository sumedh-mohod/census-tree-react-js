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
  color: theme.palette.text.text,
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
    bgcolor: theme.palette.primary.main_active,
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
            transition: (theme) => theme.transitions.create('transform'),
            // ...(isActiveRoot && {
              
            //   bgcolor: 'primary.main_active'
            // }),
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
                          bgcolor: 'primary.main_active',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText
                   disableTypography
                    primary={title}
                    sx={{
                      
                      transition: (theme) => theme.transitions.create('transform'),
                      ...(isActiveSub && {
                        
                        color: 'primary.main_active'
                      }),
                    }}
                     />
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
  // console.log(loggedUser);
  // console.log(loggedUser.roles[0].permissions);
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
 

  
  if(isContainPermission("view-teams")){
  const outerObj =  {
      
    title: 'Master',
    path: '/dashboard/role',
    icon: getIcon('eva:shopping-bag-fill'),
    // children:[]
    }
    navConfigArray.push(outerObj)

  }
  const newReportsObj = {
    title: 'Reports',
    path: '/dashboard/home',
    icon: getIcon('eva:pie-chart-2-fill'),
    children:[]
  };
  newReportsObj.children.push(
    {
      title: 'Working Tree',
      path: '/dashboard/base-color',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    )

 

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
  if(isContainPermission("base-color-offsite-qc")){
    const obj =   {
      title: 'Base Color QC',
      path: '/dashboard/baseColorPendingQC',
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
  
  

  if(isContainPermission("view-trees-on-map")){
    treeDataOuterObj.children.push(
    {
      title: 'Trees on Map',
      path: '/dashboard/treeOnMap',
      icon: getIcon('eva:shopping-bag-fill'),
    })
  }
  
  if(treeDataOuterObj.children.length !==0){
    navConfigArray.push(treeDataOuterObj);
  }

  const newReportObj =   {
    title: 'Reports',
    path: '/dashboard/newReports',
    icon: getIcon('eva:file-text-fill'),
    children:[]
  }

  if(isContainPermission("view-work-report")){
    newReportObj.children.push(
    {
      title: 'Work Reports',
      path: '/dashboard/workingReports',
      icon: getIcon('eva:shopping-bag-fill'),
    }
    )
  }
  if(isContainPermission("view-census-report")){
    newReportObj.children.push(
      {
        title: 'Census Report',
        path: '/dashboard/census-report',
        icon: getIcon('eva:shopping-bag-fill'),

     
      }
      )
    }

      if(newReportObj.children.length !==0){
        navConfigArray.push(newReportObj);
      }
    

  
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
