import React,{useState} from "react"
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Select, MenuItem, Grid } from '@mui/material';
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
const breadCrumDrop = [
  {
    label: "Role",
    value: 1,
    url:  "/dashboard/role"
  },
  {
    label: "Designation",
    value: 2,
    url:  "/dashboard/designation"
  },
  {
    label: "States",
    value: 3,
    url:  "/dashboard/state"
  },
  {
    label: "Districts",
    value: 4,
    url:  "/dashboard/district"
  },
  {
    label: "Talukas",
    value: 5,
    url:  "/dashboard/taluka"
  },
  {
    label: "Zones",
    value: 6,
    url:  "/dashboard/zone"
  },
  {
    label: "Wards",
    value: 7,
    url:  "/dashboard/ward"
  },
  {
    label: "Councils",
    value: 8,
    url:  "/dashboard/council"
  },
  {
    label: "Tree Types",
    value: 9,
    url:  "/dashboard/type-of-tree"
  },
  {
    label: "Tree Conditions",
    value: 10,
    url:  "/dashboard/tree-condition"
  },
  {
    label: "Tree Names",
    value: 11,
    url:  "/dashboard/name-of-tree"
  },
  {
    label: "Location Types",
    value: 12,
    url:  "/dashboard/location-type"
  },
  {
    label: "Property Types",
    value: 13,
    url:  "/dashboard/type-of-property"
  },
  {
    label: "QC Remarks",
    value: 14,
    url:  "/dashboard/qc-remarks"
  },
  {
    label: "Tree Disease",
    value: 15,
    url:  "/dashboard/treeDisease"
  }
]


MasterBreadCrum.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder:PropTypes.string,
  handleCoucilChange:PropTypes.func,
  handleWardChange:PropTypes.func,
  handleZoneChange:PropTypes.func,
  coucilId:PropTypes.any,
  zoneId:PropTypes.any,
  wardId:PropTypes.any
};



export default function MasterBreadCrum({name, callType, numSelected, filterName, onFilterName, placeHolder,handleCoucilChange,handleWardChange,handleZoneChange,coucilId,zoneId,wardId, dropDownPage, handleDropChange }) {
    const [dropPage, setDropPage] = useState('');

    const handleChange = (event) => {
        setDropPage(event.target.value);
       };

  
    return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >

         <Grid container >
           <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
        >
          Master
        </Link>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
        >
         
             <Select
        labelId="demo-select-small"
        id="demo-select-small"
        style={{width: "200px"}}
        value={dropDownPage}
        onChange={handleDropChange}
      >
        {breadCrumDrop?.map((option) => (
                 <MenuItem key={option.value} value={option.value} >
               <NavLink to ={option.url} style={{textDecoration: "none", color: "black"}}>{option.label}</NavLink>
                </MenuItem>
              ))}
      </Select>  
        </Link>
      </Breadcrumbs>
           
              </Grid>
    </RootStyle>
  );
}
