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
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
// import SelectInput from '../Inputs/SelectInput';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { GetActiveDistricts, GetActiveState, GetActiveTalukas } from '../../actions/MasterActions';
import { AddCouncil, EditCouncil, GetCouncilById } from '../../actions/CouncilAction';
import { GetActiveZones } from '../../actions/ZonesAction';
import { GetActiveWards } from '../../actions/WardsActions';
import DefaultInput from '../Inputs/DefaultInput';

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
  const stateValue = [
    {
      value: 'patna',
      label: 'patna',
    },
    {
      value: 'maharashtra',
      label: 'Maharashtra',
    },
  ];
  const genderValue = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const roleValue = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];
  const statusValue = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'InActive',
    },
  ];
  const DistrictValue = [
    {
      value: 'akola',
      label: 'Akola',
    },
    {
      value: 'amravati',
      label: 'Amravati',
    },
  ]

  const TalukaValue = [
    {
      value: 'akola',
      label: 'Akola',
    },
    {
      value: 'amravati',
      label: 'Amravati',
    },
  ];

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  const dispatch = useDispatch();

  const { isOpen, data } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const[district, setDistrict]=  React.useState('');
  const [stateName, setStateName] = React.useState('');
  const [taluka, setTaluka] = React.useState('');
  const [zoneName, setZoneName] = React.useState([1]);
  const [wardName, setWardName] = React.useState([1]);
  
  const {
    addCouncilLog,
    editCouncilLog,
    zones,
    wards,
    states,
    districts,
    talukas,
    councilById,
  } = useSelector((state) => ({
    addCouncilLog:state.council.addCouncilLog,
    editCouncilLog:state.council.editCouncilLog,
    zones:state.zones.zones,
    wards:state.wards.wards,
    states:state.master.states,
    districts:state.master.districts,
    talukas:state.master.talukas,
    councilById:state.council.councilById,
  }));

  React.useEffect(()=>{
    if(data && isOpen){
      dispatch(GetCouncilById(data.id));
    }
  },[data])

  useEffect(()=>{
    dispatch(GetActiveZones(1,1000,1));
    dispatch(GetActiveWards(1,1000,1));
    dispatch(GetActiveState(1,1000,1));
    dispatch(GetActiveDistricts(1,1000,1));
    dispatch(GetActiveTalukas(1,1000,1));
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

  const handleClose = () => {
    props.handleClose();
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleTalukaChange = (event) => {
    setTaluka(event.target.value);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setZoneName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleWardChange = (event) => {
    console.log("HANDLE WARD CHANGE CALLED");
    const {
      target: { value },
    } = event;
    setWardName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStateChange = (event) => {
    console.log("HANDLE STATE CHANGE");
    setStateName(event.target.value);
  };

  const findValue = (listOfObj,id) => {
    console.log("LIST OF OBJ",listOfObj);
    console.log("ID",id);
    const found = listOfObj.find(e => e.id === id);
    console.log("FOUND",found);
    if(found){
      return found.name
    }
    
  }


  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const DistrictsSchema = Yup.object().shape(
    data?
    {
      name: Yup.string().required('Name is required'),
      district: Yup.string().required('Districts is required'),
      state: Yup.string().required('State is required'),
      taluka: Yup.string().required('Taluka is required'),
      baseColorTarget: Yup.string().required('Base Color Target is required'),
      censusTarget: Yup.string().required('Census Target is required'),
      zones: Yup.array().min(1,'Zone is required'),
      wards: Yup.array().min(1,'Ward is required'),
    }
    :{
    name: Yup.string().required('Name is required'),
    district: Yup.string().required('Districts is required'),
    state: Yup.string().required('State is required'),
    taluka: Yup.string().required('Taluka is required'),
    baseColorTarget: Yup.string().required('Base Color Target is required'),
    censusTarget: Yup.string().required('Census Target is required'),
    firstName: Yup.string().required('First Name is required'),
    middleName: Yup.string().required('Middle Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    zones: Yup.array().min(1,'Zone is required'),
    wards: Yup.array().min(1,'Ward is required'),
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

    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      console.log("VALUE",value);
      if(data){
        dispatch(EditCouncil({
          "council" : {
            "name": value.name,
            "logo" : "xyz",
            "state_id" : value.state,
            "district_id" : value.district,
            "taluka_id" : value.taluka,
            "base_color_target" : value.baseColorTarget,
            "census_target" : value.censusTarget
            },
            "zones":value.zones,
            "wards": value.wards
        },data.id))
      }
      else {
        dispatch(AddCouncil({
          "council" : {
            "name": value.name,
            "logo" : "xyz",
            "state_id" : value.state,
            "district_id" : value.district,
            "taluka_id" : value.taluka,
            "base_color_target" : value.baseColorTarget,
            "census_target" : value.censusTarget
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
          "wards": value.wards
        }))
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;


  console.log("SELECTED WARD NAME",stateName)

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Council
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
                placeholder="Name"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
              />
            </Grid>
               {/* <UploadButtons/> */}
               <Grid item xs={12}>
              <Select
                id="state"
                displayEmpty
                // name="gender"
                value={stateName}
                style={{ width: '81%', marginLeft: 40 }}
                onChange={handleStateChange}
                error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
                {...getFieldProps("state")}
              >
                 <MenuItem disabled value="">
              <em>State</em>
            </MenuItem>
                {states?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
              id="district"
              // name='District'
              displayEmpty
              defaultValue={data? data.district : ""}
              value={district}
              style={{width:'81%', marginLeft: 40}}
              placeholder='Select District'
            
              onChange={handleDistrictChange}
              error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
                {...getFieldProps("district")}
            >
               <MenuItem disabled value="">
            <em>District</em>
          </MenuItem>
              {districts?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                id="taluka"
                displayEmpty
                // name="gender"
                value={taluka}
                style={{ width: '81%', marginLeft: 40 }}
                defaultValue={data ? data.taluka : ''}
                onChange={handleTalukaChange}
                error={Boolean(touched.taluka && errors.taluka)}
                helperText={touched.taluka && errors.taluka}
                {...getFieldProps("taluka")}
              >
                 <MenuItem disabled value="">
              <em>Taluka</em>
            </MenuItem>
                {talukas?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="baseColorTarget"
                autoComplete="name"
                placeholder="Enter Base Color Target"
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
                placeholder="Enter Census Target"
                error={Boolean(touched.censusTarget && errors.censusTarget)}
                helperText={touched.censusTarget && errors.censusTarget}
                {...getFieldProps("censusTarget")}
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
                  placeholder="Enter First Name"
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
                  placeholder="Enter Last Name"
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
                  placeholder="Enter Email"
                  error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                {...getFieldProps("email")}
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="contact"
                autoComplete="contact"
                placeholder="Enter Mobile No"
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
                placeholder="Enter UserName"
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
                placeholder="Password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                {...getFieldProps("password")}
              />
            </Grid>

            
            </>
            :null
            }
            <Grid item xs={12}>
            <Select
              multiple
              displayEmpty
              value={zoneName}
              onChange={handleChange}
              style={{ width: '81%', marginLeft: 40 }}
              renderValue={(selected) => {
                console.log("SELECTED",selected);
                if (selected.length === 0) {
                  return <em>Zone</em>;
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
            <em>Zone</em>
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
        </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
              multiple
              displayEmpty
              value={wardName}
              onChange={handleWardChange}
              style={{ width: '81%', marginLeft: 40 }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Ward</em>;
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
        </Select>
            </Grid>
            </Grid>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
