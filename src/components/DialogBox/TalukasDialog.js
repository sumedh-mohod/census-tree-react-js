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
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { AddTalukas, EditTalukas, GetActiveDistricts, GetActiveDistrictsByStateId, GetAllActiveDistrictsByStateId, GetActiveState } from '../../actions/MasterActions';
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
  const [showDistrict, setShowDistrict] = React.useState(false);
  const { isOpen, data } = props;
// console.log('showDistrict', showDistrict);
  const {
    addTalukasLog,
    editTalukasLog,
    states,
    districts,
  } = useSelector((state) => ({
    addTalukasLog:state.master.addTalukasLog,
    editTalukasLog:state.master.editTalukasLog,
    states:state.master.activeStates,
    districts:state.master.activeDistricts,
  }));

  React.useEffect(()=>{
    dispatch(GetActiveState(1));
    dispatch(GetActiveDistricts(1));
  },[])

  React.useEffect(()=>{
    if(data){
      setState(data.district.state_id);
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
    formik.setFieldValue('district', '');
    dispatch(GetAllActiveDistrictsByStateId(event.target.value,1));
    setShowDistrict(true);
     setDistrict("District")
     setState(event.target.value);
    //  console.log("Districts......", districts);
   };

   const handleDistrictChange = (event) => {
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
    talukas: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Taluka is required'),
    district: Yup.string().required('Districts is required'),
    state: Yup.string().required('State is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      talukas:data? data.name : "",
      state:data?data.district.state_id:"",
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
  const useStyles = makeStyles({
    icon: {
      fill: '#214c50',
  },
  });
  const classes = useStyles();

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  return (
    <div>
      
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
      >
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit Taluka":"Add Taluka"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <TextField
                select
                id="state"
                name="state"
                displayEmpty
                label="State*"
                value={values.state}
                style={{ width: '83%', marginLeft: 40,marginTop:5 }}
                onChange={(e)=> {
                  handleStateChange(e);
                  formik.handleChange(e);
                }}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
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
              style={{width:'83%', marginLeft: 40,marginTop:5}}
              placeholder='*Select District'
              onChange={(e) => {
                handleDistrictChange(e)
                formik.handleChange(e);
              }}
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
              error={Boolean(touched.district && errors.district)}
              helperText={touched.district && errors.district}
                // {...getFieldProps("district")}
            >
               <MenuItem disabled value="">
            <em>Select District*</em>
          </MenuItem>
             
               {districts?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
           
            <Grid item xs={6} md={6} sm={6} >
              <DefaultInput
                
                id="name"
                name='name'
                label="Taluka Name*"
                autoComplete="name"
                placeholder="Enter Taluka Name*"
                error={Boolean(touched.talukas && errors.talukas)}
                helperText={touched.talukas && errors.talukas}
                {...getFieldProps("talukas")}
                
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}  variant='contained'>{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
