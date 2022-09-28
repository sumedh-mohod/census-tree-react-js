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
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@mui/material';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AddDistricts, EditDistricts, GetActiveState } from '../../actions/MasterActions';
import DefaultInput from '../Inputs/DefaultInput';
import { LoginUser } from '../../actions/AuthActions';

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

export default function DistrictDialog(props) {
  const dispatch = useDispatch();
  const { isOpen, data } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [state, setState]=  React.useState("State");
  
  const {
    addDistrictsLog,
    editDistrictsLog,
    states,
  } = useSelector((state) => ({
    addDistrictsLog:state.master.addDistrictsLog,
    editDistrictsLog:state.master.editDistrictsLog,
    states:state.master.activeStates,
  }));

  useEffect(()=>{
    dispatch(GetActiveState(1));
  },[])


  useEffect(()=>{
    if(data){
      setState(data.state_id);
    }
    
  },[data])

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addDistrictsLog,editDistrictsLog])

  const handleStateChange = (event) => {
    // const states = {label:event.target.label,value:event.target.value}
    // console.log("HANDLE STATE CHANGE",event.target.value)
    // setState(event.target.value);
  };

  const findValue = (listOfObj,id) => {
    // console.log("LIST OF OBJ",listOfObj);
    // console.log("ID",id);
    const found = listOfObj.find(e => e.id === id);
    // console.log("FOUND",found);
    if(found){
      return found.name
    }
    
  }

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
    districts: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Districts is required'),
    state: Yup.string().required('State is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      districts:data? data.name : "",
      state:data?data.state_id:""
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      // console.log("VALUE",value);
      if(data){
        dispatch(EditDistricts({
          "name":value.districts,
          "state_id":value.state
        },data.id))
      }
      else {
        dispatch(AddDistricts({
          "name":value.districts,
          "state_id":value.state
        }))
      }
    },
  });

  const useStyles = makeStyles({
    icon: {
      fill: '#214c50',
  },
  });
  const classes = useStyles();
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
       
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit District":"Add District"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                label="Name*"
                placeholder="Name*"
                error={Boolean(touched.districts && errors.districts)}
                helperText={touched.districts && errors.districts}
                {...getFieldProps("districts")}
              />
            </Grid>
            <Grid item xs={12}>
             
              <TextField
              select
              id="state"
              label="State*"
              // name='State'
              value={state}
              style={{width:'83%', marginLeft: 40,marginTop:5}}
              displayEmpty
              placeholder="select State*"
              onChange={handleStateChange}
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
              // renderValue={(selected) => {

              //   console.log("SELECTED",state);
              //   if (selected.length === 0) {
              //     return <em>State</em>;
              //   }
              //   return findValue(states,state)
              // }}
              error={Boolean(touched.state && errors.state)}
                helperText={touched.state && errors.state}
                {...getFieldProps("state")}
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
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained'>{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
