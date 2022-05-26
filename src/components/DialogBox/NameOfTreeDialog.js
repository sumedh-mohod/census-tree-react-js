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

export default function NameOfTreeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [typeOfTree, SetTypeOfTree] = React.useState('')
  const { isOpen, data } = props;
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

const handleStatusChange = (event) => {
SetTypeOfTree(event.target.value);
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
        <BootstrapDialogTitle onClose={handleClose}>Name Of Tree</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="nameOfTree"
                defaultValue={data? data.nameOfTree : ""}
                placeholder="Name Of Tree"
                // name="typeOfTree"
                // value="typeOfTree"
              />
            </Grid>
            <Grid item xs={12}>
            <DefaultInput
                fullWidth
                id="botanicalName"
                autoComplete="botanicalName"
                defaultValue={data? data.botanicalName : ""}
                // multiline= {3}
                placeholder="Botanical Name"
                // name="description"
                // value="description"
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="typeOfTree"
            //   name='status'
            displayEmpty
              value={typeOfTree}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Status'
              defaultValue={data? data.typeOfTree : ""}
              onChange={handleStatusChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Type Of Tree</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Type Of Tree</em>
          </MenuItem>
              {typeOfTreeValue.map((option) => (
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
