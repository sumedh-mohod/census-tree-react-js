import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import {
  Stack,
  Avatar,
  Checkbox,
  Container,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadScript } from '@react-google-maps/api';
import DefaultInput from "../../components/Inputs/DefaultInput";
import Map from './CustomGoogleMaps';
import Page from '../../components/Page';
import { GetZonesByCouncilId } from '../../actions/ZonesAction';
import { GetWardsByCouncilId } from '../../actions/WardsActions';
import { GetAllTreeLocation } from '../../actions/TreeOnMapAction';

export default function TreeOnMap(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
    const [editUser,setEditUser] = useState(false);  
    const { isOpen, data } = props;

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCLYJVkpS7Y-N5OOglfLYLcJNmVUwQFY7E" // Add your API key
    });

    const {
      council,
      zones,
      wards,
    } = useSelector((state) => ({
      council:state.council.council,
      zones:state.zones.zones,
      wards:state.wards.wards,
    }));
  
    const handleCouncilChange = (e) =>{
      setCouncilId(e.target.value);
      setZoneId("")
      setWardId("")
      dispatch(GetZonesByCouncilId(1,1000,e.target.value))
      dispatch(GetWardsByCouncilId(1,1000,e.target.value))
    }

    const handleZoneChange = (e) =>{
      setZoneId(e.target.value);
    }
    const handleWardChange = (e) =>{
      setWardId(e.target.value);
    }

    const DistrictsSchema = Yup.object().shape({
      council: Yup.string().required('Council is required'),
      zone: Yup.string().required('Zone is required'),
      ward: Yup.string().required('Ward is required'),
    });
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        council:"",
        zone:"",
        ward:""
      },
      validationSchema: DistrictsSchema,
      onSubmit: (value) => {
        dispatch(GetAllTreeLocation(value.council,value.zone,value.ward))
      },
    });
  
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  

    return (
      <Page title="Maps">
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button> */}
        <Container>
         {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}> */}
          <Typography variant="h4" gutterBottom>
          Tree On Map
          </Typography>
          {/* </Stack> */}
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item sm={4}>
            <TextField
              select
              id="council"
              name='council'
              label="Council*"
              value={coucilId}
              displayEmpty
              style={{width:'85.5%',marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleCouncilChange(e);
                formik.handleChange(e);
              }}
              placeholder='Select council*'
              defaultValue={data? data.council: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Council*</em>;
                }
              }}
              error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
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
                label="Start Date*"
                placeholder='Start Date*'
                // defaultValue="2017-05-24"
                style={{width: '85.5%', marginLeft: 40,marginTop:5}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                // {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs={4}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="End Date*"
                placeholder= 'End Date*'
                // defaultValue="2017-05-24"
                style={{width: '85.5%', marginLeft: 40,marginTop:5}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                // {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{marginTop: 5}}>
            
          <Grid item sm={4}>
          <TextField
              select
              id="zone"
              name='zone'
              label="Zone*"
              value={zoneId}
              displayEmpty
              style={{width:'85.5%',marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleZoneChange(e);
                formik.handleChange(e);
              }}
              placeholder='Select Zone*'
              defaultValue={data? data.zone: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Zone*</em>;
                }
              }}
              error={Boolean(touched.zone && errors.zone)}
                helperText={touched.zone && errors.zone}
            >
               <MenuItem disabled value="">
            <em>Select Zone</em>
          </MenuItem>
              {coucilId? zones?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
            </TextField>
            </Grid>
            <Grid item sm={4}>
            <TextField
              select
              id="ward"
              name='ward'
              label="Ward*"
              value={wardId}
              displayEmpty
              style={{width:'85.5%', marginLeft: 40,marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleWardChange(e);
                formik.handleChange(e);
              }}
              placeholder='Select Ward*'
              defaultValue={data? data.ward: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Ward*</em>;
                }
              }}
              error={Boolean(touched.ward && errors.ward)}
              helperText={touched.ward && errors.ward}
            >
               <MenuItem disabled value="">
            <em>Select Ward</em>
          </MenuItem>
              {coucilId? wards?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
            </TextField>
            </Grid>
            <Grid item sm={4}>
            <Button variant="contained" style={{marginLeft: 40, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  onClick={handleSubmit}>Get Data</Button>
            </Grid>
            </Grid>
            <Grid container spacing={1} style={{marginTop: 20}}>
            {isLoaded ? <Map /> : null}
            </Grid>

            </Container>
           
        </Page>
               )
              }