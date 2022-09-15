import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
  Chip,
  Container,
  Card
} from '@mui/material';
// component
import { useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------
export const breadCrumDrop = [
  {
    label: 'Roles',
    value: 1,
    url: '/dashboard/role',
    slug: 'roles',
  },
  {
    label: 'Designations',
    value: 2,
    url: '/dashboard/designation',
    slug: 'designations',
  },
  {
    label: 'States',
    value: 3,
    url: '/dashboard/state',
    slug: 'states',
  },
  {
    label: 'Districts',
    value: 4,
    url: '/dashboard/district',
    slug: 'districts',
  },
  {
    label: 'Talukas',
    value: 5,
    url: '/dashboard/taluka',
    slug: 'talukas',
  },
  {
    label: 'Zones',
    value: 6,
    url: '/dashboard/zone',
    slug: 'zones',
  },
  {
    label: 'Wards',
    value: 7,
    url: '/dashboard/ward',
    slug: 'wards',
  },
  {
    label: 'Councils',
    value: 8,
    url: '/dashboard/council',
    slug: 'councils',
  },
  {
    label: 'Tree Types',
    value: 9,
    url: '/dashboard/type-of-tree',
    slug: 'tree types',
  },
  {
    label: 'Tree Families',
    value: 16,
    url: '/dashboard/families',
    slug: 'tree families',
  },
  {
    label: 'Tree Conditions',
    value: 10,
    url: '/dashboard/tree-condition',
    slug: 'tree conditions',
  },
  {
    label: 'Tree Names',
    value: 11,
    url: '/dashboard/name-of-tree',
    slug: 'tree names',
  },
  {
    label: 'Tree Diseases',
    value: 15,
    url: '/dashboard/treeDisease',
    slug: 'tree diseases',
  },
  {
    label: 'Location Types',
    value: 12,
    url: '/dashboard/location-type',
    slug: 'location types',
  },
  {
    label: 'Property Types',
    value: 13,
    url: '/dashboard/type-of-property',
    slug: 'property types',
  },
  {
    label: 'QC Remarks',
    value: 14,
    url: '/dashboard/qc-remarks',
    slug: 'qC remarks',
  },
];

export const MasterBreadCrumChip = ({ numSelected, dropDownPage, handleDropChange, slug }) => {
  const [dropPage, setDropPage] = useState('');
  const handleChange = (event) => {
    setDropPage(event.target.value);
  };
  MasterBreadCrumChip.propTypes = {
    callType: PropTypes.string,
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    placeHolder: PropTypes.string,
    handleCoucilChange: PropTypes.func,
    handleWardChange: PropTypes.func,
    handleZoneChange: PropTypes.func,
    coucilId: PropTypes.any,
    zoneId: PropTypes.any,
    wardId: PropTypes.any,
  };
  console.log('breadCrumDrop', breadCrumDrop);

  const useStyles = makeStyles({
    chipSelected: {
      backgroundColor: '#214c50',
      color: '#fff',
    },
    chip: {
      backgroundColor: '#fff',
      color: '#000',
    },
  });
  const classes = useStyles();

  return (
    <Container style={{paddingLeft: '0px', paddingRight: '0px'}}>
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: 'primary.main',
            bgcolor: 'primary.lighter',
          }),
        }}
        style={{ paddingLeft: '0px', paddingRight: '0px'}}
      >
        <Grid container >
          {/* <Breadcrumbs aria-label="breadcrumb" separator=">"> */}
          <Link
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontWeight: 40,
              fontSize: 20,
              color: '#000000',
              fontStyle: 'bold',
            }}
            color="inherit"
          >
            <Typography variant="h4">
              Master :{' '}
              <span style={{ fontWeight: '400' }}>
                {slug === undefined ? 'Roles' : slug.charAt(0).toUpperCase() + slug.slice(1)}
              </span>
              <Typography variant="h6" style={{ fontSize: '20px', fontWeight: '400' }}>
                It is showing text of selected entity
              </Typography>
            </Typography>
          </Link>
          <Link
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'sans-serif',
              fontWeight: 25,
              fontSize: 24,
              color: '#000000',
              fontStyle: 'bold',
            }}
            color="inherit"
          >
            <Card style={{backgroundColor: '#f1f1f1',  boxShadow: 'none',borderRadius: '0px'}}>
            {breadCrumDrop?.map((option) => (
              <NavLink to={option.url} style={{ textDecoration: 'none' }}>
                <Chip
                  label={option.label}
                  key={option.value}
                  onClick={() => {
                    handleDropChange(option.label);
                  }}
                  variant="outlined"
                  value={dropDownPage}
                  className={option.slug === slug ? classes.chipSelected : classes.chip}
                  style={{
                    fontWeight: '700',
                    borderRadius: '7px',
                    border: 'none',
                  }}
                  sx={{ mr: 1.5,mb: 1.5 }}
                />
              </NavLink>
            ))}
            </Card>
          </Link>
          {/* </Breadcrumbs> */}
        </Grid>
      </RootStyle>
    </Container>
  );
};
