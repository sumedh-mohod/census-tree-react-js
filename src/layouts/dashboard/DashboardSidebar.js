import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material

import { Gradient } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../_mock/account';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import navConfig from './NavConfig';
import PlantLogo from '../../Assets/plant_logo.png';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const useStyles = makeStyles({
    item: {
      backgroundColor: '#214c50'
    },
    
    middle:{
      fontWeight: 'bold',
       fontSize: 24,
        color: '#c8cf61'
    },
    body:{
      fontSize: 13,
       color: '#fff'
    }
  });
  const classes = useStyles();
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
      className={classes.item}
    >
      <Box sx={{ display: 'inline-flex', pt: 2.5,pl: 2.5, pr:2.5,pb: 2.5 }} style={{borderBottom: '1.5px dashed #f8f8f8'}} >
      <img src={PlantLogo} alt="abell" height='40' width='40' style={{marginTop: '4px'}}/>
      <Typography className={classes.middle} >tree census
      <Typography className={classes.body} sx={{mt: -1}}>Tree on, global warming gone</Typography>
      </Typography>
      {/* <Typography variant='h6'>tree census</Typography> */}
      </Box>
      <NavSection navConfig={navConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
