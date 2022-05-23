import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import DefaultInput from '../Inputs/DefaultInput';
// import SelectInput from '../Inputs/SelectInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  dialogBox: {
    padding: '20px, 20px',
  },
}));

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

export default function NewUserDialog(props) {
  const genderValue = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const roleValue = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];
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
  const { isOpen, isClose } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('male');
  const [role, setRole] = React.useState('male')
  const [status, setStatus] = React.useState('active')
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open dialog
        </Button> */}
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New User
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent dividers>
        <Grid container spacing={1}>
        <Grid item xs={6}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="Name"
                name="name"
                value="name"
              />
            </Grid>
            <Grid item xs={6}>
              <DefaultInput fullWidth id="Email" autoComplete="email" placeholder="Email" name="email" value="email" />
            </Grid>
            <Grid item xs={6}>
              <DefaultInput
                fullWidth
                id="contact"
                autoComplete="contact"
                placeholder="Mobile No"
                name="contact"
                value="contact"
              />
            </Grid>
            <Grid item xs={6}>
              <DefaultInput
                fullWidth
                id="aadhar"
                autoComplete="aadhar"
                placeholder="Aadhar"
                name="aadhar"
                value="aadhar"
              />
            </Grid>
            <Grid item xs={6}>
              <DefaultInput
                fullWidth
                id="address"
                autoComplete="address"
                placeholder="Address"
                name="address"
                value="address"
              />
            </Grid>
            <Grid item xs={6}>
              <Select
              id="gender"
              name='gender'
              value={gender}
              style={{width:'80%'}}
            
              onChange={handleGenderChange}
            >
              {genderValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={6}>
            <Select
              id="role"
              name='role'
              value={role}
              style={{width:'80%'}}
            
              onChange={handleRoleChange}
            >
              {roleValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={6}>
            <Select
              id="status"
              name='status'
              value={status}
              style={{width:'80%'}}
            
              onChange={handleRoleChange}
            >
              {statusValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
