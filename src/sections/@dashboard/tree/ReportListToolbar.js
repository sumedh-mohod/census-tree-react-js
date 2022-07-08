import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Select, MenuItem, Grid, Button } from '@mui/material';
// component
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { GetReports } from '../../../actions/ReportsAction';
import Iconify from '../../../components/Iconify';


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

ReportListToolbar.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder:PropTypes.string,
  handleCoucilChange:PropTypes.func,
  handleGetData: PropTypes.func,
  // handleWardChange:PropTypes.func,
  // handleZoneChange:PropTypes.func,
  coucilId:PropTypes.any,
  fromDate:PropTypes.any,
  toDate:PropTypes.any,
  zoneId:PropTypes.any,
  wardId:PropTypes.any
};








export default function ReportListToolbar({numSelected, handleGetData}) {
  const dispatch = useDispatch();
  const [coucilId,setCouncilId] = useState('');

  const handleCouncilChange = (e) =>{
    setCouncilId(e.target.value);
    // setZoneId("")
    // setWardId("")
    // dispatch(GetZonesByCouncilId(1,1000,e.target.value))
    // dispatch(GetWardsByCouncilId(1,1000,e.target.value))
  }


  const DistrictsSchema = Yup.object().shape({
    council: Yup.string().required('Council is required'),
    fromDate: Yup.string().required('From Date is Required'),
    toDate: Yup.string().required('To Date is Required'),
  });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      council:"",
      fromDate:"",
      toDate:""
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      dispatch(GetReports(value.council, "01-01-2020", "30-12-2022"))
      console.log("value", value)
    },
  });




    const {
        council,
        // zones,
        // wards,
        reports
      } = useSelector((state) => ({
        council:state.council.council,
        reports:state.reports.reports,
      }));
console.log("council", council)
console.log("reports123", reports)

const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
     <Grid item xs={4} justifyContent="flex-end">
           
     <TextField
              select
              id="council"
              name='council'
              label="Select Council*"
              value={coucilId}
              displayEmpty
              style={{width: "180px"}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleCouncilChange(e);
                formik.handleChange(e);
              }}
              placeholder='Select council*'
              // defaultValue={data? data.council: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Council*</em>;
                }
              }}
              error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
                {...getFieldProps("council")}
            >
               <MenuItem disabled value="">
            <em>Select Councils</em>
          </MenuItem>
              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
              </Grid>
              <Grid item xs={4}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="From Date*"
                placeholder='From Date*'
                // defaultValue="2017-05-24"
                style={{width: '90.5%',  marginLeft: 40}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                {...getFieldProps("fromDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs={4}>
              <TextField
                id="date"
                // value={toDate}
                type="date"
                label="To Date*"
                placeholder= 'To Date*'
                // defaultValue="2017-05-24"
                style={{width: '90.5%', marginLeft: 30}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                {...getFieldProps("toDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>



         <Grid container justifyContent="flex-end">
          {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
          <Grid item sm={4}>
            <Button variant="contained" onClick={handleSubmit} style={{marginLeft: 30, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  >Get Data</Button>
            </Grid>
              </Grid>
   </RootStyle>
  );
}
