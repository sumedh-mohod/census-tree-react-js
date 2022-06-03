import * as React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AddTalukas, EditTalukas, GetAllState, GetDistrictsByStateId } from '../../actions/MasterActions';
import DefaultInput from '../Inputs/DefaultInput';

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

export default function TalukasDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const[state, setState]=  React.useState('State');
  const[district, setDistrict]=  React.useState('District');
  const { isOpen, data } = props;

  const {
    addTalukasLog,
    editTalukasLog,
    states,
    districts,
  } = useSelector((state) => ({
    addTalukasLog:state.master.addTalukasLog,
    editTalukasLog:state.master.editTalukasLog,
    states:state.master.states,
    districts:state.master.districts,
  }));

  React.useEffect(()=>{
    dispatch(GetAllState(1,1000));
  },[])

  React.useEffect(()=>{
    if(data){
      setState(data.state_id);
      setDistrict(data.district_id);
    }
    
  },[data])

  const firstRun = React.useRef(true);
  React.useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addTalukasLog,editTalukasLog])
 

   const handleStateChange = (event) => {
     dispatch(GetDistrictsByStateId(event.target.value))
     setDistrict("District")
     setState(event.target.value);
   };

   const handleDistrictChange = (event) => {
     console.log("DISTRICT CHANGE CALLED");
     setDistrict(event.target.value);
   };

  const stateValue = [
    {
      value: 'patna',
      label: 'patna',
    },
    {
      value: 'maharastra',
      label: 'Maharastra',
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
  ];

  const handleClose = () => {
    props.handleClose();
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const DistrictsSchema = Yup.object().shape({
    talukas: Yup.string().required('Taluka is required'),
    district: Yup.string().required('Districts is required'),
    state: Yup.string().required('State is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      talukas:data? data.name : "",
      state:data?data.state_id:"",
      district:data?data.district_id:"",

    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditTalukas({
          "name":value.talukas,
          "state_id":value.state,
          "district_id":value.district
        },data.id))
      }
      else {
        dispatch(AddTalukas({
          "name":value.talukas,
          "state_id":value.state,
          "district_id":value.district
        }))
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>Add Taluka</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                placeholder="*Enter Taluka Name"
                error={Boolean(touched.talukas && errors.talukas)}
                helperText={touched.talukas && errors.talukas}
                {...getFieldProps("talukas")}
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="taluka_state"
              displayEmpty
              // name='State'
              value={state}
              style={{width:'83%', marginLeft: 40}}
              placeholder='*Select State'
              onChange={handleStateChange}
              error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
                {...getFieldProps("state")}
            >
              <MenuItem disabled value="">
            <em>*Select State</em>
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
              id="taluka_district"
              // name='District'
              displayEmpty
              value={district}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Select District'
              onChange={handleDistrictChange}
              error={Boolean(touched.district && errors.district)}
                helperText={touched.district && errors.district}
                {...getFieldProps("district")}
            >
               <MenuItem disabled value="">
            <em>*Select District</em>
          </MenuItem>
              {districts?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
