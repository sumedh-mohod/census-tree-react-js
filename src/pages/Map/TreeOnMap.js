import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
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
import { makeStyles } from '@material-ui/core/styles';
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
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import { GetAllTreeLocation } from '../../actions/TreeOnMapAction';
import {GetActiveCouncil} from '../../actions/CouncilAction';
import Iconify from '../../components/Iconify';

export default function TreeOnMap(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [treeNumber,setTreeNumber] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const [showList,setShowList] = useState(false);
    const [editUser,setEditUser] = useState(false);  
    const { isOpen, data } = props;
    const todayDate = moment(new Date()).format('YYYY-MM-DD');

    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCbcbSWRM0VC1brHZPFWxX4hhuQxhcySDE" // Add your API key
    });

    const {
      council,
      zones,
      wards,
      activeZonesByCID,
      activeWardsByCID,
      treeLocation
    } = useSelector((state) => ({
      council:state.council.activeCouncil,
      zones:state.zones.zones,
      wards:state.wards.wards,
      activeWardsByCID:state.wards.activeWardsByCID,
      activeZonesByCID:state.zones.activeZonesByCID,
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
  
  useEffect(()=>{
    dispatch(GetActiveCouncil(1));
  },[])
    const handleCouncilChange = (e) =>{
      setCouncilId(e.target.value);
      setZoneId("")
      setWardId("")
      dispatch(GetActiveZonesByCouncilId(1,e.target.value))
      dispatch(GetActiveWardsByCouncilId(1,e.target.value))
    }

    const handleZoneChange = (e) =>{
      setZoneId(e.target.value);
    }
    const handleWardChange = (e) =>{
      setWardId(e.target.value);
    }

    const handleTreeNumberChange = (e) =>{
      setTreeNumber(e.target.value);
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

    const TreeSchema = Yup.object().shape({
      council: Yup.string().required('Council is required'),
      treeNumber: Yup.string().required('TreeNumber is required'),
      
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
      validationSchema: treeNumber ? TreeSchema : DistrictsSchema,
      onSubmit: (value) => {
        // console.log("in on ");
        setState({ ...state, "right": false });
        dispatch(GetAllTreeLocation(value.council,value.zone,value.ward,value.fromDate,value.toDate,treeNumber))
      },
    });
    const useStyles = makeStyles({
      icon: {
          fill: '#214C50',
      },
  })
  const classes = useStyles()
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  

    return (
      <Page title="Maps">
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button> */}
        <Container>
       
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
          Trees On Map
          <Typography variant="h6" style={{ fontWeight: 400 }}>
              It is showing trees on the map
            </Typography>
          </Typography>
          <Button
             onClick={toggleDrawer("right", true)} 
            variant="contained"
            to="#"
          
            startIcon={<Iconify icon="eva:funnel-fill" />}
          >
            Filter
          </Button>
          </Stack>
          
          
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
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
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
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
            >
               <MenuItem disabled value="">
            <em>Select Zone</em>
          </MenuItem>
              {coucilId? activeZonesByCID?.map((option) => (
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
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
            >
               <MenuItem disabled value="">
            <em>Select Ward</em>
          </MenuItem>
              {coucilId? activeWardsByCID?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
            </TextField>
            
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
                inputProps={{ max: todayDate }}
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
                inputProps={{ max: todayDate }}
              />
              <Divider style={{marginTop:10}}>OR</Divider>
              <TextField
                fullWidth
                id="treeNumber"
                type="text"
                autoComplete="Tree No"
                placeholder="Tree No*"
                label="Tree No*"
                onChange={(e) => {
                  handleTreeNumberChange(e)
                  formik.handleChange(e);
                }}
                style={{width:'85.5%', marginLeft: 20,marginTop:10}}
                // defaultValue={values? values.state : ""}
                // onChange = {(e)=>{console.log("Value",e.target.value)}}
                // error={Boolean(touched.state && errors.state)}
                // helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
                error={Boolean(touched.treeNumber && errors.treeNumber)}
                helperText={touched.treeNumber && errors.treeNumber}
              />
            <Button onClick={handleSubmit} variant="contained" style={{width:'60%',marginLeft:"20%",marginRight:"20%",marginTop:20}}>
            Apply

          </Button>

           
          </div>
          </Drawer>
            <Grid container spacing={1} style={{marginTop: 20}}>
            {isLoaded ? <Map treeLocation={showList?treeLocation:[]} /> : null}
            </Grid>

            </Container>
           
        </Page>
               )
              }