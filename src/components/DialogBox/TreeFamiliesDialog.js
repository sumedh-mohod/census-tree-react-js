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
import DefaultInput from '../Inputs/DefaultInput';
import { AddTreeFamily, EditTreeFamily } from '../../actions/TreeFamilyAction';

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

export default function TreeFamiliesDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const { isOpen, data } = props;

  const {
    addTreeFamilyLog,
    editTreeFamilyLog
  } = useSelector((state) => ({
    addTreeFamilyLog:state.treeFamily.addTreeFamilyLog,
    editTreeFamilyLog:state.treeFamily.editTreeFamilyLog,
  }));

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose();
  },[addTreeFamilyLog,editTreeFamilyLog])

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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

  const DesignationsSchema = Yup.object().shape({
    treeFamily: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Tree Family is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      treeFamily:data? data.tree_family : "",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditTreeFamily({
          "tree_family":value.treeFamily,
        },data.id))
      }
      else {
        dispatch(AddTreeFamily({
          "tree_family":value.treeFamily,
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
      >
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit Tree Family":"Add Tree Family"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="treeFamily"
                autoComplete="typeOfTree"
                label="Tree Family*"
                placeholder="Tree Family*"
                error={Boolean(touched.treeFamily && errors.treeFamily)}
                helperText={touched.treeFamily && errors.treeFamily}
                {...getFieldProps("treeFamily")}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit} variant='contained' >{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
