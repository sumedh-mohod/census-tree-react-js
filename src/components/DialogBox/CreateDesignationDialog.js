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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { AddDesignations, EditDesignations } from '../../actions/DesignationAction';
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

export default function CreateDesignationDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const { isOpen, data } = props;

  const {
    designations,
    addDesignationsLog,
    editDesignationsLog,

  } = useSelector((state) => ({
    designations:state.designations.designations,
    addDesignationsLog:state.designations.addDesignationsLog,
    editDesignationsLog:state.designations.editDesignationsLog,
  }));

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

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose();
  },[addDesignationsLog,editDesignationsLog])

const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleClose = () => {
    props.handleClose();
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  const DesignationsSchema = Yup.object().shape({
    designations: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(35,"Maximum length 35 character only").required('Designations is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      designations:data? data.name : "",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditDesignations({
          "name":value.designations,
        },data.id))
      }
      else {
        dispatch(AddDesignations({
          "name":value.designations,
        }))
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;



  return (
    <div>
     
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
       
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>{data? `Edit Designation` : `Create Designation`}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={6} md={6} sm={6} >
              <DefaultInput
                fullWidth
                id="designation"
                label="Designation Name*"
                autoComplete="designation"
                placeholder="Enter Designation Name*"
                error={Boolean(touched.designations && errors.designations)}
                helperText={touched.designations && errors.designations}
                {...getFieldProps("designations")}
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
