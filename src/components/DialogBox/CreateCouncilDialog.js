import React, { useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, TextField } from '@mui/material';
// import SelectInput from '../Inputs/SelectInput';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { GetActiveDistricts, GetActiveDistrictsByStateId, GetAllActiveDistrictsByStateId, GetActiveState, GetAllActiveTalukaByDistrictId, GetActiveTalukas } from '../../actions/MasterActions';
import { AddCouncil, AddCouncilWithLogo, EditCouncil, EditCouncilWithLogo, GetCouncilById } from '../../actions/CouncilAction';
import { GetActiveZones } from '../../actions/ZonesAction';
import { GetActiveWards } from '../../actions/WardsActions';
import DefaultInput from '../Inputs/DefaultInput';
import { UploadImage } from '../../actions/UploadActions';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Input = styled('input')({
  display: 'none',
});

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CreateCouncilDialog(props) {
  
  const dispatch = useDispatch();

  const { isOpen, data } = props;
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const[district, setDistrict]=  React.useState('');
  const [stateName, setStateName] = React.useState('');
  const [taluka, setTaluka] = React.useState('');
  const [zoneName, setZoneName] = React.useState([1]);
  const [wardName, setWardName] = React.useState([1]);
  const [logoValue, setLogoValue] = React.useState("");
  const [logoPath, setLogoPath] = React.useState("");
  const [files, setFiles] = React.useState("");
  const [logoError, setLogoError] = React.useState("");
  const [isEditable, setIsEditable] = React.useState(false);
  const [isImageRemoved, setIsImageRemoved] = React.useState(false);
  const [showDistrict, setShowDistrict] = React.useState(false);
  const [showTaluka, setShowTaluka] = React.useState(false);
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  // console.log('data', data)
  const {
    addCouncilLog,
    editCouncilLog,
    zones,
    wards,
    states,
    districts,
    talukas,
    councilById,
    uploadImage,
    uploadImageLog
  } = useSelector((state) => ({
    addCouncilLog:state.council.addCouncilLog,
    editCouncilLog:state.council.editCouncilLog,
    zones:state.zones.activeZonesByCID,
    wards:state.wards.activeWardsByCID,
    states:state.master.activeStates,
    districts:state.master.activeDistricts,
    talukas:state.master.activeTalukas,
    councilById:state.council.councilById,
    uploadImage:state.upload.uploadImage,
    uploadImageLog:state.upload.uploadImageLog,
  }));
  console.log('wards', wards);

  React.useEffect(()=>{
    if(data && isOpen){
      dispatch(GetCouncilById(data.id));
      setIsEditable(true);
    }
  },[data])

  useEffect(()=>{
    dispatch(GetActiveZones(1));
    dispatch(GetActiveWards(1));
    dispatch(GetActiveState(1));
    // dispatch(GetActiveDistricts(1));
    // dispatch(GetActiveTalukas(1));
    if (data) {
    //  console.log("console");
      dispatch(GetAllActiveDistrictsByStateId(data.state_id,1));
      dispatch(GetAllActiveTalukaByDistrictId(data.district_id.name,1))
      setShowDistrict(true);
      setShowTaluka(true);
    }
  },[])

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addCouncilLog,editCouncilLog])

  const secondRun = React.useRef(true);
  React.useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    if(councilById){
      separateId(councilById.zones,councilById.wards)
      setLogoValue(councilById.logo?councilById.logo:"")
    }
    
  },[councilById])


  const separateId = (zones,wards) => {
    const zoneArray = [];
    zones.map((value,index)=>{

      zoneArray.push(value.id);
      return null;
    })
    setZoneName(zoneArray)

    const wardArray = [];
    wards.map((value,index)=>{

      wardArray.push(value.id);
      return null;
    })
    setWardName(wardArray)
  }
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // console.log("///", districts);
  const handleClose = () => {
    setLogoValue("");
    props.handleClose();
  };

  const handleDistrictChange = (event) => {
    dispatch(GetAllActiveTalukaByDistrictId(event.target.value,1))
    setDistrict(event.target.value);
    setShowTaluka(true);
    setTaluka("Taluka")
  };

  const handleTalukaChange = (event) => {
    setTaluka(event.target.value);
  };
  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setZoneName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const handleWardChange = (event) => {
    const {
      target: { value },
    } = event;
    setWardName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStateChange = (event) => {
    dispatch(GetAllActiveDistrictsByStateId(event.target.value,1));
    setShowDistrict(true);
    setDistrict("District")
    setTaluka("Taluka")
    setStateName(event.target.value);
  };

  const findValue = (listOfObj,id) => {
    const found = listOfObj.find(e => e.id === id);
    if(found){
      return found.name
    }
    
  }

  const handleLogoChange = (e) => {
    // const formData = new FormData();
    // formData.append('upload_for', 'councils');
    // formData.append('image', e.target.files[0]);
    // dispatch(UploadImage(formData));
    setLogoValue(e.target.value); 
    setFiles(e.target.files[0])
  }

  const handleImageRemove = (e) => {
    setLogoValue("");
    setFiles("");
    setIsImageRemoved(true);
  }

  
  const validateLogo = () => {
    let validated = true;

    if(!logoValue){
      validated = false;
      setLogoError("Upload Logo")
    }
    else {
      setLogoError("")
    }
    return validated;
  }


  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const DistrictsSchema = Yup.object().shape(
    data?
    {
      name: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter name upto 30 characters').required('Name is required'),
      district: Yup.string().required('Districts is required'),
      state: Yup.string().required('State is required'),
      // taluka: Yup.string().required('Taluka is required'),
      baseColorTarget: Yup.string().required('Base Color Target is required'),
      censusTarget: Yup.string().required('Census Target is required'),
      zones: Yup.array().min(1,'Zone is required'),
      wards: Yup.array().min(1,'Ward is required'),
      locationAccuracyNeeded: Yup.string().required('Location Accuracy Needed is required'),
      project_start_date: Yup.string().required('Start Date is required'),
    }
    :{
    name: Yup.string().matches(/^[a-zA-Z ]{2,30}$/, 'Please enter name upto 30 characters').required('Name is required'),
    district: Yup.string().required('Districts is required'),
    state: Yup.string().required('State is required'),
    // taluka: Yup.string().required('Taluka is required'),
    baseColorTarget: Yup.string().required('Base Color Target is required'),
    censusTarget: Yup.string().required('Census Target is required'),
    firstName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(20,"Maximum length 20 character only").required('First Name is required'),
    // middleName: Yup.string().required('Middle Name is required'),
    lastName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(20,"Maximum length 20 character only").required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().matches(/^[0-9]\d{9}$/, 'Mobile number is not valid').required('Mobile number is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().matches(/^.{6,}$/, 'password should have at least 6 characters').required('Password is required'),
    zones: Yup.array().min(1,'Zone is required'),
    wards: Yup.array().min(1,'Ward is required'),
    locationAccuracyNeeded: Yup.string().required('Location Accuracy Needed is required'),
    project_start_date: Yup.string().required('Start Date is required'),
    // "project_end_date": value.project_end_date
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data ? 
    {
      district:data? data.district_id : "",
      state:data?data.state_id:"",
      taluka:data?data.taluka_id:"",
      name:data?data.name:"",
      baseColorTarget:data?data.base_color_target:"",
      censusTarget:data?data.census_target:"",
      zones: data?zoneName:[],
      wards: data?wardName:[],
      locationAccuracyNeeded:data?data.location_accuracy_needed:"",
      project_start_date: data?data.project_start_date:"",
      project_end_date: data?data.project_end_date:""
    }
    :{
      district:data? data.district_id : "",
      state:data?data.state_id:"",
      taluka:data?data.taluka_id:"",
      name:data?data.name:"",
      baseColorTarget:data?data.base_color_target:"",
      censusTarget:data?data.census_target:"",
      firstName: data?data.contact_person.first_name:"",
      middleName: data?data.contact_person.middle_name:"",
      lastName: data?data.contact_person.last_name:"",
      email: data?data.contact_person.email:"",
      mobile: data?data.contact_person.mobile:"",
      username: data?data.contact_person.username:"",
      password: data?data?.password:"",
      zones: data?[]:[],
      wards: data?[]:[],
      locationAccuracyNeeded:data?data.location_accuracy_needed:"",
      project_start_date: data?data.project_start_date:"",
      project_end_date: data?data.project_end_date:""

    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      // console.log(value)
      if(data){
        if(validateLogo() && isImageRemoved){
          const formData = new FormData();
            formData.append('upload_for', 'councils');
            formData.append('image', files);
          dispatch(EditCouncilWithLogo(formData,{
            "council" : {
              "name": value.name,
              "state_id" : value.state,
              "district_id" : value.district,
              "taluka_id" : value.taluka,
              "base_color_target" : value.baseColorTarget,
              "census_target" : value.censusTarget,
              "location_accuracy_needed": value.locationAccuracyNeeded,
              "project_start_date": value.project_start_date,
              "project_end_date": value.project_end_date
              },
              "zones":value.zones,
              "wards": value.wards,
              
          },data.id))
        }

        else if(validateLogo()){
          dispatch(EditCouncil({
            "council" : {
              "name": value.name,
              "logo": logoValue,
              "state_id" : value.state,
              "district_id" : value.district,
              "taluka_id" : value.taluka,
              "base_color_target" : value.baseColorTarget,
              "census_target" : value.censusTarget,
              "location_accuracy_needed": value.locationAccuracyNeeded,
              "project_start_date": value.project_start_date,
              "project_end_date": value.project_end_date
              },
              "zones":value.zones,
              "wards": value.wards,
            
          },data.id))
        }
        
      }
      else if(validateLogo()){
          
            const formData = new FormData();
            formData.append('upload_for', 'councils');
            formData.append('image', files);
            dispatch(AddCouncilWithLogo(formData,{
              "council" : {
                "name": value.name,
                "state_id" : value.state,
                "district_id" : value.district,
                "taluka_id" : value.taluka,
                "base_color_target" : value.baseColorTarget,
                "census_target" : value.censusTarget,
                "location_accuracy_needed": value.locationAccuracyNeeded,
                "project_start_date": value.project_start_date,
                "project_end_date": value.project_end_date

                },
                "contact_person" : {
                  "first_name" : value.firstName,
                  "middle_name" : value.middleName,
                  "last_name" : value.lastName,
                  "email" : value.email,
                  "mobile" :value.mobile,
                  "username" : value.username,
                  "password" : value.password
              },
              "zones":value.zones,
              "wards": value.wards,
              
            }))
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;
  console.log("VALUES",values)
  return (
    <div>
      <BootstrapDialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {data?"Edit Council":"New Council"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Council Details
        </BootstrapDialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                placeholder="Name*"
                label="Name*"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
              />
            </Grid>
               {/* <UploadButtons/> */}
               <Grid item xs={12}>
              <TextField
                select
                id="state"
                name="state"
                displayEmpty
                label="State*"
                value={values.state}
                style={{ width: '81%', marginLeft: 40,marginTop:5 }}
                onChange={(e)=> {
                  handleStateChange(e);
                  formik.handleChange(e);
                }}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
                // {...getFieldProps("state")}
              >
                 <MenuItem disabled value="">
              <em>State*</em>
            </MenuItem>
                {states?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              id="district"
              name='district'
              label="District*"
              displayEmpty
              value={values.district}
              style={{width:'81%', marginLeft: 40,marginTop:5}}
              placeholder='*Select District'
              onChange={(e) => {
                handleDistrictChange(e)
                formik.handleChange(e);
              }}
              error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
                // {...getFieldProps("district")}
            >
               <MenuItem disabled value="">
            <em>Select District*</em>
          </MenuItem>
              {showDistrict?districts?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
            </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                id="taluka"
                name="taluka"
                displayEmpty
                label="Taluka"
                // name="gender"
                value={taluka}
                style={{ width: '81%', marginLeft: 40,marginTop:5 }}
                defaultValue={data ? data.taluka : ''}
                onChange={handleTalukaChange}
                error={Boolean(touched.taluka && errors.taluka)}
                helperText={touched.taluka && errors.taluka}
                {...getFieldProps("taluka")}
              >
                 <MenuItem disabled value="">
              <em>Select Taluka</em>
            </MenuItem>
                {showTaluka?talukas?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="baseColorTarget"
                autoComplete="name"
                label="Base Color Target*"
                placeholder="Enter Base Color Target*"
                error={Boolean(touched.baseColorTarget && errors.baseColorTarget)}
                helperText={touched.baseColorTarget && errors.baseColorTarget}
                {...getFieldProps("baseColorTarget")}
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="censusTarget"
                autoComplete="name"
                label="Census Target*"
                placeholder="Enter Census Target*"
                error={Boolean(touched.censusTarget && errors.censusTarget)}
                helperText={touched.censusTarget && errors.censusTarget}
                {...getFieldProps("censusTarget")}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              SelectProps={{
                multiple:true
              }}
              label="Zone*"
              displayEmpty
              value={zoneName}
              // onChange={handleChange}
              style={{ width: '81%', marginLeft: 40 , marginTop:5}}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Zone*</em>;
                }
                const result = [];
                selected.map((value)=>{
                  const found = findValue(zones,value);
                  result.push(found);
                  return null;
                })
                

                return result.join(",");
              }}
              error={Boolean(touched.zones && errors.zones)}
                helperText={touched.zones && errors.zones}
              // MenuProps={MenuProps}
              {...getFieldProps("zones")}
              // inputProps={{ 'aria-label': 'Without label' }}
            >
          <MenuItem disabled value="">
            <em>Zone*</em>
          </MenuItem>
          {zones?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              // style={getStyles(name, personName, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              SelectProps={{
                multiple:true
              }}
              label="Ward*"
              displayEmpty
              value={wardName}
              onChange={handleWardChange}
              style={{ width: '81%', marginLeft: 40, marginTop:5 }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Ward*</em>;
                }
                const result = [];
                selected.map((value)=>{
                  const found = findValue(wards,value);
                  result.push(found);
                  return null;
                })

                return result.join(",");
              }}
              error={Boolean(touched.wards && errors.wards)}
                helperText={touched.wards && errors.wards}
              // MenuProps={MenuProps}
              {...getFieldProps("wards")}
              // inputProps={{ 'aria-label': 'Without label' }}
            >
          <MenuItem disabled value="">
            <em>Ward</em>
          </MenuItem>
          {wards?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              // style={getStyles(name, personName, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="locationAccuracyNeeded"
                autoComplete="name"
                label="Location Accuracy Needed* (in meter)"
                placeholder="Enter Location Accuracy Needed* (in meter)"
                error={Boolean(touched.locationAccuracyNeeded && errors.locationAccuracyNeeded)}
                helperText={touched.locationAccuracyNeeded && errors.locationAccuracyNeeded}
                {...getFieldProps("locationAccuracyNeeded")}
              />
            </Grid>
           
            <Grid item xs={5}>
                 <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="Start Date*"
                placeholder='Start Date*'
                // defaultValue="2017-05-24"
                style={{ width: '81%', marginLeft: 40, marginTop:5 }}
                // className={classes.textField}
                error={Boolean(touched.project_start_date && errors.project_start_date)}
                helperText={touched.project_start_date && errors.project_start_date}
                {...getFieldProps("project_start_date")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: todayDate }}
              />
              </Grid>
              <Grid item xs={5}>
              <TextField
                id="date"
                // value={toDate}
                type="date"
                label="End Date*"
                placeholder= 'End Date*'
                // defaultValue="2017-05-24"
                style={{ width: '81%', marginLeft: 40, marginTop:5 }}
                // className={classes.textField}
                error={Boolean(touched.project_end_date && errors.project_end_date)}
                helperText={touched.project_end_date && errors.project_end_date}
                {...getFieldProps("project_end_date")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ min: todayDate }}
              />
            </Grid>

            <Divider />
            {!data?
            <>
          <BootstrapDialogTitle id="customized-dialog-title" style={{ marginLeft: 10 }}>
            Contact Person
        </BootstrapDialogTitle>
        <Divider />
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="firstName"
                 autoComplete="firstName"
                 label="First Name*"
                  placeholder="Enter First Name*"
                  error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                {...getFieldProps("firstName")}
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="middleName"
                 autoComplete="middleName"
                 label="Middle Name"
                  placeholder="Enter Middle Name"
                  error={Boolean(touched.middleName && errors.middleName)}
                helperText={touched.middleName && errors.middleName}
                {...getFieldProps("middleName")}
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="lName"
                 autoComplete="lName"
                 label="Last Name*"
                  placeholder="Enter Last Name*"
                  error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                {...getFieldProps("lastName")} 
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="email"
                 autoComplete="email"
                 label="Email*"
                  placeholder="Enter Email*"
                  error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                {...getFieldProps("email")}
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="contact"
                type="number"
                autoComplete="contact"
                label="Mobile Number*"
                placeholder="Enter Mobile No*"
                error={Boolean(touched.mobile && errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                {...getFieldProps("mobile")}
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="username"
                autoComplete="username"
                placeholder="Enter UserName*"
                label="Username*"
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                {...getFieldProps("username")}
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="password"
                autoComplete="password"
                label="Password*"
                placeholder="Password*"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                {...getFieldProps("password")}
              />
            </Grid>
            </>
            :null
            }
            <BootstrapDialogTitle id="customized-dialog-title">
          {logoValue?"Uploaded Logo":"Upload Logo"}
        </BootstrapDialogTitle>
            {(isEditable && logoValue)?

              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Link fullWidth
                  style={{width: '88%', marginLeft: 55}}  target="_blank" rel="noopener" href={`${logoValue}`}>
                    View Uploaded Image
                  </Link>

                  <IconButton color={'error'} aria-label={'delete'} size="large" onClick={()=>handleImageRemove(logoValue)}>
                <CancelIcon fontSize="inherit" />
              </IconButton>

                </Grid>
               
            
            
              </Grid>:
              <Grid item xs={12}>
              
              <TextField
                  fullWidth
                  style={{width: '81%', marginLeft: 40,marginTop:5}}
                  id="logo"
                  type={"file"}
                  autoComplete="amount"
                  // placeholder="Upload Logo"
                  value={logoValue}
                  error={Boolean(logoError)}
                  helperText={logoError}
                  onChange={(e)=>handleLogoChange(e)}
                />
                {/* <label htmlFor="logo">Click me to upload image</label> */}
              </Grid>

            }
            
            </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus 
          onClick={(e)=>{
            validateLogo();
            formik.handleSubmit(e)
          }}
            >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
