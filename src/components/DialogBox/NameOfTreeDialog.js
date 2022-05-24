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

export default function NameOfTreeDialog(props) {
    const typeOfTreeValue = [
        {
          value: 'fruitTree',
          label: 'Fruit Tree',
        },
        {
          value: 'flowerTree',
          label: 'Flower Tree',
        },
      ];
  const { isOpen, isClose } = props;
  console.log(isOpen);
  const [open, setOpen] = React.useState(false);
  const [typeOfTree, SetTypeOfTree] = React.useState('fruitTree')

  const handleStatusChange = (event) => {
    SetTypeOfTree(event.target.value);
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Name Of Tree
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent dividers>
        <Grid container spacing={1}>
        <Grid item xs={6}>
              <DefaultInput
                fullWidth
                id="nameOfTree"
                // autoComplete="typeOfTree"
                placeholder="Name Of Tree"
                // name="typeOfTree"
                // value="typeOfTree"
              />
            </Grid>
            <Grid item xs={6}>
            <DefaultInput
                fullWidth
                id="botanicalName"
                autoComplete="botanicalName"
                multiline= {3}
                placeholder="Botanical Name"
                // name="description"
                // value="description"
              />
            </Grid>
            <Grid item xs={6}>
            <Select
              id="status"
            //   name='status'
              value={typeOfTree}
              style={{width:'80%'}}
              placeholder='Status'
            
              onChange={handleStatusChange}
            >
              {typeOfTreeValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={6}>
            <DefaultInput
                fullWidth
                id="description"
                autoComplete="description"
                multiline= {3}
                placeholder="description"
                // name="description"
                // value="description"
              />
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
