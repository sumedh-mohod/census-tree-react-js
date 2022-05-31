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
// import SelectInput from '../Inputs/SelectInput';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import DefaultInput from '../Inputs/DefaultInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Input = styled('input')({
  display: 'none',
});

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

export default function CreateCouncilDialog(props) {
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
  const DistrictValue = [
    {
      value: 'akola',
      label: 'Akola',
    },
    {
      value: 'amravati',
      label: 'Amravati',
    },
  ]

  const TalukaValue = [
    {
      value: 'akola',
      label: 'Akola',
    },
    {
      value: 'amravati',
      label: 'Amravati',
    },
  ];

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  const { isOpen, data } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const[district, setDistrict]=  React.useState('');
  const [stateName, setStateName] = React.useState('');
  const [taluka, setTaluka] = React.useState('');
  const [ZoneName, setZoneName] = React.useState([]);
  const [WardName, setWardName] = React.useState([]);
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleClose = () => {
    props.handleClose();
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleTalukaChange = (event) => {
    setTaluka(event.target.value);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setZoneName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleWardChange = (event) => {
    const {
      target: { value },
    } = event;
    setWardName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleStateChange = (event) => {
    setStateName(event.target.value);
  };


  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Council
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Council Details
        </BootstrapDialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                defaultValue={data ? data.name : ''}
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="Name"
                // name="name"
                // value="name"
              />
            </Grid>
               {/* <UploadButtons/> */}
               <Grid item xs={12}>
              <Select
                id="state"
                displayEmpty
                // name="gender"
                value={stateName}
                style={{ width: '81%', marginLeft: 40 }}
                defaultValue={data ? data.state : ''}
                onChange={handleStateChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>State</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>State</em>
            </MenuItem>
                {stateValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
              id="district"
              // name='District'
              displayEmpty
              defaultValue={data? data.district : ""}
              value={district}
              style={{width:'81%', marginLeft: 40}}
              placeholder='Select District'
            
              onChange={handleDistrictChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>District</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>District</em>
          </MenuItem>
              {DistrictValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
                id="taluka"
                displayEmpty
                // name="gender"
                value={taluka}
                style={{ width: '81%', marginLeft: 40 }}
                defaultValue={data ? data.taluka : ''}
                onChange={handleTalukaChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Taluka</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Taluka</em>
            </MenuItem>
                {stateValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Divider />
            <BootstrapDialogTitle id="customized-dialog-title">
            Contact Person
        </BootstrapDialogTitle>
        <Divider />
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="name"
                 autoComplete="name"
                  placeholder="Name"
                  defaultValue={data ? data.name : ''}
                  //  name="email"
                  //   value="email" 
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="mName"
                 autoComplete="mName"
                  placeholder="Middle Name"
                  defaultValue={data ? data.mName : ''}
                  //  name="email"
                  //   value="email" 
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="lName"
                 autoComplete="lName"
                  placeholder="Last Name"
                  defaultValue={data ? data.lName : ''}
                  //  name="email"
                  //   value="email" 
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
               fullWidth
                id="email"
                 autoComplete="email"
                  placeholder="Email"
                  defaultValue={data ? data.email : ''}
                  //  name="email"
                  //   value="email" 
                    />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="contact"
                autoComplete="contact"
                placeholder="Mobile No"
                defaultValue={data ? data.contact : ''}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="username"
                autoComplete="username"
                placeholder="User Name"
                defaultValue={data ? data.username : ''}
                // name="address"
                // value="address"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="password"
                autoComplete="password"
                placeholder="Password"
                defaultValue={data ? data.password : ''}
                // name="address"
                // value="address"
              />
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
