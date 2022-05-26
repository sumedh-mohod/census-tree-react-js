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
import DefaultInput from '../Inputs/DefaultInput';

export default function CreateRoleDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const { isOpen, data } = props;

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
        <DialogTitle onClose={handleClose}>Add District</DialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="name"
                autoComplete="name"
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="District Name"
                defaultValue={data?data.distName:""}
              
                // name="name"
                // value="name"
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="state"
              // name='State'
              value={state}
              style={{width:'83%', marginLeft: 40}}
              displayEmpty
              placeholder="select State"
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
