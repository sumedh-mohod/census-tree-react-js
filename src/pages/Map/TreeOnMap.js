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
  Drawer,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
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
   const [showList,setShowList] = useState(false);
    const [editUser,setEditUser] = useState(false);  
    const { isOpen, data } = props;

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCLYJVkpS7Y-N5OOglfLYLcJNmVUwQFY7E" // Add your API key
    });

    const {
      council,
      zones,
      wards,
      treeLocation
    } = useSelector((state) => ({
      council:state.council.activeCouncil,
      zones:state.zones.zones,
      wards:state.wards.wards,
      treeLocation:state.treeLocation.treeLocation
    }));

    const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[treeLocation])
  
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

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        ((event).key === "Tab" || (event).key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
  
    };

    const DistrictsSchema = Yup.object().shape({
      council: Yup.string().required('Council is required'),
      zone: Yup.string().required('Zone is required'),
      ward: Yup.string().required('Ward is required'),
      fromDate: Yup.string().required('From date is required'),
      toDate: Yup.string().required('To date is required'),
    });
  
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        council:"",
        zone:"",
        ward:"",
        treeNo: "",
        fromDate:"",
        toDate:"",
      },
      validationSchema: DistrictsSchema,
      onSubmit: (value) => {
        console.log("in on ");
        setState({ ...state, "right": false });
        dispatch(GetAllTreeLocation(value.council,value.zone,value.ward,value.fromDate,value.toDate))
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
          Trees On Map
          </Typography>
          {/* </Stack> */}
          <Button
           variant='outlined'
            sx={{justifyContent:'end', display:'flex', position: 'fixed',right: 0,top:'100px',border:'2px solid black',backgroundColor:'black',zIndex:'999', 
            "&.MuiButtonBase-root:hover": {
              bgcolor: "black",
              border:'2px solid black'
            }
          }}
            onClick={toggleDrawer("right", true)} 
           
          >
        <FilterAltRoundedIcon sx={{color:'white'}} />
          </Button> 
          <Drawer
           sx= {
            {
              "& .MuiDrawer-paper": {
                width: "300px",
                maxWidth: "100%",
                justifyContent:"center",
                alignItems:"center",
              },
            }
          }
          anchor={"right"} open={state.right} onClose={toggleDrawer("right", false)}
        >
          <div>
          <TextField
              select
              id="council"
              name='council'
              label="Council*"
              value={coucilId}
              displayEmpty
              style={{width:'85.5%', marginLeft: 20}}
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
          
               <TextField
              select
              id="zone"
              name='zone'
              label="Zone*"
              value={zoneId}
              displayEmpty
              style={{width:'85.5%', marginLeft: 20, marginTop:10}}
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
            <TextField
              select
              id="ward"
              name='ward'
              label="Ward*"
              value={wardId}
              displayEmpty
              style={{width:'85.5%', marginLeft: 20,marginTop:10}}
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
            <TextField
                fullWidth
                id="treeNo"
                type="text"
                autoComplete="Tree No"
                placeholder="Tree No*"
                label="Tree No*"
                style={{width:'85.5%', marginLeft: 20,marginTop:10}}
                // defaultValue={values? values.state : ""}
                // onChange = {(e)=>{console.log("Value",e.target.value)}}
                // error={Boolean(touched.state && errors.state)}
                // helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
              />
            <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="From Date*"
                placeholder='From Date*'
                // defaultValue="2017-05-24"
                style={{width: '85.5%', marginLeft: 20,marginTop:10}}
                // className={classes.textField}
                error={Boolean(touched.fromDate && errors.fromDate)}
                helperText={touched.fromDate && errors.fromDate}
                {...getFieldProps("fromDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
                <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="To Date*"
                placeholder= 'To Date*'
                // defaultValue="2017-05-24"
                style={{width: '85.5%', marginLeft: 20,marginTop:10}}
                // className={classes.textField}
                error={Boolean(touched.toDate && errors.toDate)}
                helperText={touched.toDate && errors.toDate}
                {...getFieldProps("toDate")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <Button onClick={handleSubmit} variant="contained" style={{width:'60%',marginLeft:"20%",marginRight:"20%",marginTop:20}}>
            Get Data

          </Button>

            {/* <Button variant="contained" style={{marginLeft: 50, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  onClick={handleSubmit}>Get Data</Button> */}
          </div>
          </Drawer>
            <Grid container spacing={1} style={{marginTop: 20}}>
            {isLoaded ? <Map treeLocation={showList?treeLocation:[]} /> : null}
            </Grid>

            </Container>
           
        </Page>
               )
              }