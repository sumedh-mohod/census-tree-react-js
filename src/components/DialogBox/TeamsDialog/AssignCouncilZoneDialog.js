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
import AssignNewZoneWardConfirmationDialog from './AssignNewZoneWardConfirmationDialog';

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

export default function AssignCouncilZoneDialog(props) {
  const CouncilNameValue = [
    {
      value: 'liberty Council',
      label: 'Liberty Council',
    },
    {
      value: 'Board of Eternity',
      label: 'Board of Eternity',
    },
    {
      value: 'Living Council',
      label: 'Living Council',
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
  
  const { isOpen, data, isOpenConfirm } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [councilName, setCouncilName] = React.useState('');
  const [ZoneName, setZoneName] = React.useState([]);
  const [WardName, setWardName] = React.useState([]);
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCouncilName = (event) => {
    setCouncilName(event.target.value);
  };
  const handleConfirmationDialogClick = () => {
    console.log("hiiii")
    setOpen(open)
  }
  const handleClose = () => {
    props.handleClose();
  };

  const handleZoneChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleWardChange = (event) => {
    setWardName(event.target.value);
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Council
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Select
                id="councilName"
                displayEmpty
                // name="role"
                value={councilName}
                style={{ width: '83%', marginLeft: 40 }}
                defaultValue={data ? data.councilName : ''}
                onChange={handleCouncilName}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Select Council Name</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Select Council Name</em>
            </MenuItem>
                {CouncilNameValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
          // multiple
          displayEmpty
          value={ZoneName}
          onChange={handleZoneChange}
          style={{ width: '83%', marginLeft: 40 }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Zone</em>;
            }

            return selected
          }}
          // MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Zone</em>
          </MenuItem>
                {CouncilNameValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
        </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
          // multiple
          displayEmpty
          value={WardName}
          onChange={handleWardChange}
          style={{ width: '83%', marginLeft: 40 }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select Ward</em>;
            }

            return selected
          }}
          // MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Select Ward</em>
          </MenuItem>
          {CouncilNameValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
        </Select>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
        <AssignNewZoneWardConfirmationDialog
        // open={open}
        isOpenConfirm={open}
        onClose={handleClose}
        // onClose={handleConfirmationDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      />
          <Button autoFocus open={handleConfirmationDialogClick  }>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
