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
import { GetUsers, GetActiveUsers } from '../../../actions/UserAction';
import { AddUserToTeam } from '../../../actions/TeamsAction';

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

    const roleName = [
        'analyst',
        'Admin',
        'Super Admin',
        'Tree Counting',
      ];
  const { isOpen, data, isOpenConfirm,teamId } = props;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const [role, setRole] = React.useState([]);
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null)
  let selectedUsers;

  const {
    users,
    activeUsers,
    assignUserToTeamLog,
  } = useSelector((state) => ({
    users: state.users,
    activeUsers:state.users.activeUsers,
    assignUserToTeamLog:state.teams.assignUserToTeamLog,
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
  React.useEffect(()=>{
    // dispatch(GetUsers(1,1000));
    dispatch(GetActiveUsers(1));
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
    const {
        target: { value },
      } = event;
      setRole(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

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
    user: Yup.string().required('User is required'),
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

  console.log("active users", activeUsers);

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
              // SelectProps={{
              //   multiple:true
              // }}
              label="User*"
                id="role"
                multiple
                displayEmpty
                // name="role"
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
          {activeUsers?.map((option) => (
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
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
