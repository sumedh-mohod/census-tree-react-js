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
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AddPropertyType, EditPropertyType } from '../../actions/PropertyTypeAction';
import {GetActiveLocationType} from '../../actions/LocationTypeAction'

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

export default function TypeOfPropertyDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const [locationType, setLocationType] = React.useState('')

  const { isOpen, data } = props;

  const {
    propertyTypes,
    addPropertyTypesLog,
    editPropertyTypesLog,
    locationTypes,

  } = useSelector((state) => ({
    propertyTypes:state.propertyTypes.propertyTypes,
    addPropertyTypesLog:state.propertyTypes.addPropertyTypesLog,
    editPropertyTypesLog:state.propertyTypes.editPropertyTypesLog,
    locationTypes:state.locationTypes.activeLocationTypes,
  }));

  React.useEffect(()=>{
    dispatch(GetActiveLocationType(1));
  },[])

  const firstRun = React.useRef(true);
  React.useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose();
  },[addPropertyTypesLog,editPropertyTypesLog])

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
  const handleLocationTypeChange = (event) => {
    // const states = {label:event.target.label,value:event.target.value}
    setLocationType(event.target.value)
    // setState(event.target.value);
  };

  const DesignationsSchema = Yup.object().shape({
    location_type: Yup.string().required('Location Type Type is required'),
    propertyTypes: Yup.string().matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed').required('Property Type is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      location_type:data?data.location_type_id: "",
      propertyTypes:data? data.property_type : "",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditPropertyType({
          "property_type":value.propertyTypes,
          "location_type_id":value.location_type,
        },data.id))
      }
      else {
        dispatch(AddPropertyType({
          "property_type":value.propertyTypes,
          "location_type_id":value.location_type,
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
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit Property Type":"Add Property Type"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
             
             <Select
             id="locationType"
             // name='State'
             value={locationType}
             style={{width:'83%', marginLeft: 40}}
             displayEmpty
             placeholder="Location Type*"
             onChange={handleLocationTypeChange}
             inputProps={{
              classes: {
                  icon: classes.icon,
              },
          }}
             //   return findValue(states,state)
             // }}
             error={Boolean(touched.location_type && errors.location_type)}
             helperText={touched.location_type && errors.location_type}
             {...getFieldProps("location_type")}
             // error={Boolean(touched.state && errors.state)}
             //   helperText={touched.state && errors.state}
           >
              <MenuItem disabled value="" >
           <em>Location Type*</em>
         </MenuItem>
             {locationTypes?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
              {option.location_type}
            </MenuItem>
             ))}
          </Select>
           
           </Grid>
           <Grid item xs={6} md={6} sm={6} >
              <DefaultInput
                fullWidth
                id="typeOfProperty"
                placeholder="Type Of Property*"
                error={Boolean(touched.propertyTypes && errors.propertyTypes)}
                helperText={touched.propertyTypes && errors.propertyTypes}
                {...getFieldProps("propertyTypes")}
              />
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
