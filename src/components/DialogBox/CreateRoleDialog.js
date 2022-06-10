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
import { AddRole, EditRole, GetPermission, GetRoleById } from '../../actions/RoleAction';
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

export default function CreateRoleDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const [permissionArray, setPermissionArray] = React.useState([])
  const { isOpen, data } = props;

  const {
    addRolesLog,
    editRolesLog,
    permission,
    roleById
  } = useSelector((state) => ({
    addRolesLog:state.roles.addRolesLog,
    editRolesLog:state.roles.editRolesLog,
    permission:state.roles.permission,
    roleById:state.roles.roleById
  }));

  React.useEffect(()=>{
    dispatch(GetPermission());
  },[]);

  React.useEffect(()=>{
    if(data && isOpen){
      dispatch(GetRoleById(data.id));
    }
  },[data])

  const firstRun = React.useRef(true);
  React.useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[addRolesLog,editRolesLog])

  const secondRun = React.useRef(true);
  React.useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    if(roleById){
      separateId(roleById.permissions)
    }
    
  },[roleById])

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

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPermissionArray(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const findValue = (listOfObj,id) => {
    console.log("LIST OF OBJ",listOfObj);
    console.log("ID",id);
    const found = listOfObj.find(e => e.id === id);
    console.log("FOUND",found);
    if(found){
      return found.display_name
    }
    
  }

  const separateId = (listOfObj) => {
    const resultArray = [];
    listOfObj.map((value,index)=>{

      resultArray.push(value.id);
      return null;
    })

    setPermissionArray(resultArray)
    
  }

  const DistrictsSchema = Yup.object().shape({
    roles: Yup.string().max(20,"Maximum length 20 character only").required('Role is required'),
    permission: Yup.array().min(1, "Permission in Required").required('Permission is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roles:data? data.role : "",
      permission:data? permissionArray:[]
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditRole({
          "role":value.roles,
          "permissions":value.permission
        },data.id))
      }
      else {
        dispatch(AddRole({
          "role":value.roles,
          "permissions":value.permission
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
        <BootstrapDialogTitle onClose={handleClose}>{data? `Edit Role` : `Create Role`}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="role"
                autoComplete="role"
                label="Role Name*"
                placeholder="Enter Role Name*"
                error={Boolean(touched.roles && errors.roles)}
                helperText={touched.roles && errors.roles}
                {...getFieldProps("roles")}
              />
            </Grid>

            <Grid item xs={12}>
            <TextField
              select
              SelectProps={{
                multiple:true
              }}
              displayEmpty
              value={permissionArray}
              label="Permission*"
              onChange={handleChange}
              style={{ width: '82.5%', marginLeft: 40, marginTop:5 }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Permission*</em>;
                }
                const result = [];
                selected.map((value)=>{
                  const found = findValue(permission,value);
                  result.push(found);
                  return null;
                })
                

                return result.join(",");
              }}
              error={Boolean(touched.permission && errors.permission)}
                helperText={touched.permission && errors.permission}
              // MenuProps={MenuProps}
              {...getFieldProps("permission")}
              // inputProps={{ 'aria-label': 'Without label' }}
            >
          <MenuItem disabled value="">
            <em>Permission</em>
          </MenuItem>
          {permission?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              // style={getStyles(name, personName, theme)}
            >
              {option.display_name}
            </MenuItem>
          ))}
        </TextField>
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
