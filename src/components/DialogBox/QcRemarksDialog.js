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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { AddQcRemarks, EditQcRemarks, GetQcRemarks } from '../../actions/QcRemarksAction';
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
  const [remarkFor, setRemarkFor]=  React.useState("");

  const RemarkForValue = [
      {
      id : "Base Color",
      name: "Base Color"
      },
      {
        id : "Census",
        name: "Census"
        },
  ]
  
  const {
    addQcRemarksLog,
    editQcRemarksLog,
    qcremarks,
    // states,
  } = useSelector((remark) => ({
    addQcRemarksLog:remark.qcRemarksTypes.addQcRemarksLog,
    editQcRemarksLog:remark.qcRemarksTypes.editQcRemarksLog,
    qcremarks:remark.qcRemarksTypes.qcremarks,
  }));

  console.log('qcremarks', qcremarks)

  useEffect(()=>{
    dispatch(GetQcRemarks(1,1000,1));
    console.log('qcremarks', qcremarks)
  },[])


  useEffect(()=>{
    if(data){
      setState(data.qcremarks_id);
    }
    
  },[data])

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addQcRemarksLog,editQcRemarksLog])

  const handleRemarksForChange = (event) => {
    // const states = {label:event.target.label,value:event.target.value}
    setRemarkFor(event.target.value)
    // setState(event.target.value);
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

  const QcRemarksSchema = Yup.object().shape({
    remarks: Yup.string().required('Remarks is required'),
    remarkFor: Yup.string().required('RemarkFor is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      remarks:data? data.remark : "",
      remarkFor:data?data.remark_for:""
    },
    validationSchema: QcRemarksSchema,
    onSubmit: (value) => {
      console.log("VALUE",value);
      if(data){
        dispatch(EditQcRemarks({
          "remark":value.remarks,
          "remark_for":value.remarkFor
        },data.id))
      }
      else {
        dispatch(AddQcRemarks({
          "remark":value.remarks,
          "remark_for":value.remarkFor
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
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit QC Remarks":"Add QC Remarks"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="remark"
                autoComplete="remark"
                placeholder="Remark*"
                label="Remark*"
                error={Boolean(touched.remarks && errors.remarks)}
                helperText={touched.remarks && errors.remarks}
                {...getFieldProps("remarks")}
              />
            </Grid>
            <Grid item xs={12}>
             
              <TextField
              select
              id="remarkFor"
              label="Remark for*"
              value={remarkFor}
              style={{width:'83%', marginLeft: 40, marginTop:5}}
              displayEmpty
              placeholder="Remark for*"
              onChange={handleRemarksForChange}
              //   return findValue(states,state)
              // }}
              renderValue={(selected) => {
                //   console.log("SELECTED",state);
                //   if (selected.length === 0) {
                    return  <em>Remark For*</em>;
                  }}
              error={Boolean(touched.remarkFor && errors.remarkFor)}
                helperText={touched.remarkFor && errors.remarkFor}
                {...getFieldProps("remarkFor")}
            >
               <MenuItem >
            <em>Remark For*</em>
          </MenuItem>
              {RemarkForValue?.map((option) => (
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
          <Button onClick={handleSubmit}>{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
