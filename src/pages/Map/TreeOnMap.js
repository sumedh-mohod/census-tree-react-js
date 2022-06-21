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

export default function TreeOnMap(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [council, setCouncil] = React.useState('');
    const [zone, setZone] = React.useState('');
    const [ward, setWard] = React.useState('');
    const [editUser,setEditUser] = useState(false);  
    const { isOpen, data } = props;

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCLYJVkpS7Y-N5OOglfLYLcJNmVUwQFY7E" // Add your API key
    });
  
    const councilValue = [
        {
        value : "Kalmeshwar Muncipal Council",
        label : "Kalmeshwar Muncipal Council",
        },
        {
            value : "New Delhi Muncipal Council",
            label : "New Delhi Muncipal Council",
            },
    ]
    const zoneValue = [
        {
        value : "Zone 1",
        label : "Zone 1",
        },
        {
            value : "Zone 2",
            label : "Zone 2",
            },
    ]

    const wardValue = [
        {
        value : "Ward 1",
        label : "Ward 1",
        },
        {
            value : "Ward 2",
            label : "Ward 2",
            },
    ]


    const handleCouncilChange = (event) =>{
        setCouncil(event.target.value);
    }

    const handleZoneChange = (event) =>{
        setCouncil(event.target.value);
    }
    const handleWardChange = (event) =>{
        setCouncil(event.target.value);
    }

    console.log("IS LOADED",isLoaded);

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
              value={council}
              displayEmpty
              style={{width:'85.5%',marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleCouncilChange(e)
              }}
              placeholder='Select council*'
              defaultValue={data? data.council: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Council*</em>;
                }
              }}
            >
               <MenuItem disabled value="">
            <em>Select Councils</em>
          </MenuItem>
              {councilValue?.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.value}
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
            //   value={GetZones}
              displayEmpty
              style={{width:'85.5%',marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleZoneChange(e)
              }}
              placeholder='Select Zone*'
              defaultValue={data? data.zone: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Zone*</em>;
                }
              }}
            >
               <MenuItem disabled value="">
            <em>Select Zone</em>
          </MenuItem>
              {zoneValue?.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item sm={4}>
            <TextField
              select
              id="ward"
              name='ward'
              label="Ward*"
              value={ward}
              displayEmpty
              style={{width:'85.5%', marginLeft: 40,marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleWardChange(e)
              }}
              placeholder='Select Ward*'
              defaultValue={data? data.ward: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Ward*</em>;
                }
              }}
            >
               <MenuItem disabled value="">
            <em>Select Ward</em>
          </MenuItem>
              {wardValue?.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item sm={4}>
            <Button variant="contained" style={{marginLeft: 40, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}>Get Data</Button>
            </Grid>
            </Grid>
            <Grid container spacing={1} style={{marginTop: 20}}>
            {isLoaded ? <Map /> : null}
            </Grid>

            </Container>
           
        </Page>
               )
              }