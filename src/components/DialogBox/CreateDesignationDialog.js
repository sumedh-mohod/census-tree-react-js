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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import DefaultInput from '../Inputs/DefaultInput';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
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

export default function CreateDesignation(props) {
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
  const { isOpen, data } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('Status')

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create Designation
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent dividers>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="designation"
                autoComplete="designation"
                placeholder="Create Designation"
                defaultValue={data? data.designation : ""}
                // name="designation"
                // value="designation"
              />
            </Grid>
            <Grid item xs={12}>
            <DefaultInput
                fullWidth
                id="description"
                autoComplete="description"
                placeholder="Description"
                defaultValue={data? data.description : ""}
                // name="description"
                // value="description"
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="status"
              // name='status'
              // value={status}
              style={{width:'83%', marginLeft: 40}}
              defaultValue={data? data.status : ""}
              onChange={handleStatusChange}
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
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
