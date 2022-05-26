import * as React from 'react';
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

export default function TalukasDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const[state, setState]=  React.useState('Maharastra');
  const[district, setDistrict]=  React.useState('Nagpur');
  const { isOpen, data } = props;

 
   const handleStateChange = (event) => {
     setState(event.target.value);
   };
   const handleDistrictChange = (event) => {
     setDistrict(event.target.value);
   };

  const stateValue = [
    {
      value: 'patna',
      label: 'patna',
    },
    {
      value: 'maharastra',
      label: 'Maharastra',
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
        <BootstrapDialogTitle onClose={handleClose}>Add Taluka</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                placeholder="District Name"
                defaultValue={data? data.name : ""}
                // name="name"
                // value="name"
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="state"
              displayEmpty
              // name='State'
              value={state}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Select State'
              onChange={handleStateChange}
              defaultValue={data? data.state : ""}
            >
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
              style={{width:'83%', marginLeft: 40}}
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
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
