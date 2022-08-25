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
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { GetUsers } from '../../../actions/UserAction';
import { AddUserToTeam } from '../../../actions/TeamsAction';
import { GetQcRemarksForBaseColor } from '../../../actions/BaseColorAction';

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

export default function QcStatusDialog(props) {

  const dispatch = useDispatch();
  const { isOpen, data, isOpenConfirm,teamId } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const [role, setRole] = React.useState([]);
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null)

  const {
    baseColorRemarks,
    updateQCStatusLog,
    updateCensusQCStatusLog,
  } = useSelector((state) => ({
    baseColorRemarks:state.baseColor.baseColorRemarks,
    updateQCStatusLog:state.baseColor.updateQCStatusLog,
    updateCensusQCStatusLog:state.treeCensus.updateQCStatusLog,
  }));

  const firstRun = React.useRef(true);
  React.useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // console.log("INSIDE USEEFFECT");
    // console.log(localStorage.getItem("token"))
    props.handleClose()
  },[updateQCStatusLog, updateCensusQCStatusLog])

  React.useEffect(()=>{
    dispatch(GetQcRemarksForBaseColor("Base Color"))
  },[])


  const handleClose = () => {
    props.handleClose();
  };


  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };


  const DistrictsSchema = Yup.object().shape({
    remark: Yup.string().required("Remark is required"),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      remark:"",
      
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
        props.handleSubmit(value.remark,props.baseColorId)
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit,getFieldProps} = formik;


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
        <BootstrapDialogTitle onClose={handleClose}>QC Remarks</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                select
                label="Remark*"
                id="remark"
                name="remark"
                displayEmpty
                value={values.remark}
            
                style={{ width: '83%', marginLeft: 40, marginTop:5 }}
                error={Boolean(touched.remark && errors.remark)}
                  helperText={touched.remark && errors.remark}
                  {...getFieldProps("remark")}
              >
           <MenuItem disabled value="">
            <em>Remark*</em>
          </MenuItem>
          {baseColorRemarks?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              // style={getStyles(name, personName, theme)}
            >
              {option.remark}
            </MenuItem>
          ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}>Unapprove</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
