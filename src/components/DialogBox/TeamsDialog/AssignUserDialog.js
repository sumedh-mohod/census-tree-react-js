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
import AssignUserConfirmationDialog from './AssignUserConfirmationDialog';
import { GetUsers, GetActiveUsers, GetUsersByRoleID } from '../../../actions/UserAction';
import { AddUserToTeam } from '../../../actions/TeamsAction';
import { GetActiveRole } from '../../../actions/RoleAction';

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

export default function AssignUserDialog(props) {

  const dispatch = useDispatch();
  const { isOpen, data, isOpenConfirm,teamId } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const [role, setRole] = React.useState([]);
  const [roleID, setRoleID] = React.useState(null);
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null)


  const {
    activeUsers,
    assignUserToTeamLog,
    roles,
    userByRoleID
  } = useSelector((state) => ({
    activeUsers:state.users.activeUsers,
    assignUserToTeamLog:state.teams.assignUserToTeamLog,
    roles:state.roles.roles,
    userByRoleID: state.users.userByRoleID,
  }));
  // userById:state.users.userById,
  // if(users){
  //   selectedUsers= users.filter(
  //     (currentValue) => {if(currentValue.assigned_roles.includes("Census User") || currentValue.assigned_roles.includes("Census QC - Offsite")){
  //       return currentValue;
  //     }
  //     return null;
  // });
//     console.log(":::::::::", activeUsers);
// }

// console.log("/////...", roles)
  React.useEffect(()=>{
    // dispatch(GetUsers(1,1000));
    dispatch(GetActiveRole(1));
  },[])

  const firstRun = React.useRef(true);
  React.useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose()
  },[assignUserToTeamLog])



  const handleRoleChange = (event) => {
    // console.log("in role change", event.target.value);
    setRoleID(event.target.value)
    dispatch(GetUsersByRoleID(1, event.target.value));
  };


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
    user: Yup.string().required('User is required'),
    role: Yup.string().required('Role is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user:data? data.user_id : "",
      
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      handleTopModalClose();

      if(data){
        setReqObj({
          "team_id": teamId,
          "users":[value.user],
        })
  
        setId(data.id);
      }

      else {

        setReqObj({
          "team_id": teamId,
          "users": [value.user]
        })
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;

  // console.log("active users", activeUsers);

  const handleTopModalClose = () => {
    setTopModalOpen(!topModalOpen)
  }

  const handleTopModalAnswer = (answer) => {
    if(answer){
      if(data){
           dispatch(AddUserToTeam(reqObj))
      }
      else {
        dispatch(AddUserToTeam(reqObj))
      }
    }
    setTopModalOpen(!topModalOpen)
  }

  const findValue = (listOfObj,id) => {
    const found = listOfObj.find(e => e.id === id);
    if(found){
      return found.first_name
    }
    
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <AssignUserConfirmationDialog
        isOpenConfirm={topModalOpen}
        handleClose = {(answer)=>handleTopModalAnswer(answer)}
       />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>Assign Users</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <TextField
              select
             
              id="role"
              name='role'
              label="Role*"
              value={roleID}
              displayEmpty
              style={{ width: '83%', marginLeft: 40, marginTop:5 }}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleRoleChange(e)
                formik.handleChange(e);
              }}
              placeholder='Select Role*'
              // defaultValue={data? data.role: ""}
              // renderValue={(selected) => {
              //   if (selected?.length === 0) {
              //     return <em>Select Role*</em>;
              //   }
              //   const result = [];
              //   selected?.map((value)=>{
              //     const found = findRole(roles,value);
              //     result.push(found);
              //     return null;
              //   })
              //   return result.join(",");
              // }}

              // renderValue={(selected) => {
              //   if (selected?.length === 0) {
              //     return <em>Select Role*</em>;
              //   }
              //     const found = findRole(roles,role);
              //   return found;
              // }}

              error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}

            >
               <MenuItem disabled value="">
            <em>Select Role</em>
          </MenuItem>
              {roles?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
            <Grid item xs={12}>
              <TextField
              select
              // SelectProps={{
              //   multiple:true
              // }}
              label="User*"
                id="user"
                multiple
                displayEmpty
                name="user"
                value={role}
                style={{ width: '83%', marginLeft: 40, marginTop:5 }}
                defaultValue={data ? data.role : ''}
                // renderValue={(selected) => {
                //   console.log("SELECTED",selected);
                //   if (selected.length === 0) {
                //     return <em>User*</em>;
                //   }
                //   const result = [];
                //   selected.map((value)=>{
                //     const found = findValue(users,value);
                //     result.push(found);
                //     return null;
                //   })
                  
  
                //   return result.join(",");
                // }}
                renderValue={(selected) => {
                  if (selected?.length === 0) {
                    return <em>Select Role*</em>;
                  }
                    const found = findValue(activeUsers,values.user);
                  return found;
                }}
                error={Boolean(touched.user && errors.user)}
                  helperText={touched.user && errors.user}
                // MenuProps={MenuProps}
                {...getFieldProps("user")}
              >
           <MenuItem disabled value="">
            <em>User*</em>
          </MenuItem>
          {roleID && userByRoleID?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              // style={getStyles(name, personName, theme)}
            >
              {option.first_name} {option.last_name} ({option.username})
            </MenuItem>
          ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit} style={{boxShadow: 'none',background: '#214c50', color: '#fff'}}>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
