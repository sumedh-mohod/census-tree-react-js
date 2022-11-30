import PropTypes from 'prop-types';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import LogoGreen from '../Assets/LogoGreen.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  const location = useLocation();
  // console.log("PATH NAME",location.pathname);

  let notRedirect = false;

  if(location.pathname==="/login"){
    notRedirect = true;
  };

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box sx={{ width: 100, height: 30, ...sx }} >
      
      <img src={LogoGreen} alt="abell" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to={notRedirect?"#":"/dashboard/home"}>{logo}</RouterLink>;
}
