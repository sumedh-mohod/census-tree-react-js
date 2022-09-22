import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

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
import DefaultInput from '../Inputs/DefaultInput';
import { AddTreeDisease, EditTreeDisease } from '../../actions/TreeDiseaseAction';

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

export default function TreeDiseaseDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const { isOpen, data } = props;

  const {
    addTreeDiseaseLog,
    editTreeDiseaseLog
  } = useSelector((state) => ({
    addTreeDiseaseLog:state.treeDisease.addTreeDiseaseLog,
    editTreeDiseaseLog:state.treeDisease.editTreeDiseaseLog
  }));

  const firstRun = useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addTreeDiseaseLog,editTreeDiseaseLog])
  


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

  const StateSchema = Yup.object().shape({
    treeDisease: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Tree Disease is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      treeDisease:data? data.tree_disease : ""
    },
    validationSchema: StateSchema,
    onSubmit: (value) => {

      if(data){
        dispatch(EditTreeDisease({
          "tree_disease":value.treeDisease
        },data.id))
      }
      else {
        dispatch(AddTreeDisease({
          "tree_disease":value.treeDisease
        }))
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  // console.log("values",values);
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
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit Tree Disease":"Add Tree Disease"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="treeDisease"
                autoComplete="treeDisease"
                placeholder="Enter Tree Disease*"
                label="Tree Disease*"
                // defaultValue={values? values.state : ""}
                // onChange = {(e)=>{console.log("Value",e.target.value)}}
                error={Boolean(touched.treeDisease && errors.treeDisease)}
                helperText={touched.treeDisease && errors.treeDisease}
                {...getFieldProps("treeDisease")}
              />
            </Grid>
            
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}   >{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
