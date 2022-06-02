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
import AssignUserConfirmationDialog from './AssignUserConfirmationDialog';

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
    const roleName = [
        'analyst',
        'Admin',
        'Super Admin',
        'Tree Counting',
      ];
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const[state, setState]=  React.useState('');
  const [role, setRole] = React.useState([]);
  const { isOpen, data } = props;
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null)

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

  const handleTopModalClose = () => {
    setTopModalOpen(!topModalOpen)
  }

  const handleTopModalAnswer = (answer) => {
    if(answer){
      if(data){
          //  dispatch(AddCZWToTeam(reqObj,id))
      }
      else {
        // dispatch(AddCZWToTeam(reqObj))
      }
    }
    setTopModalOpen(!topModalOpen)
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
        <BootstrapDialogTitle onClose={handleClose}>Assign User</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
            <Grid item xs={12}>
              <Select
                id="role"
                multiple
                displayEmpty
                // name="role"
                value={role}
                style={{ width: '83%', marginLeft: 40 }}
                defaultValue={data ? data.role : ''}
                onChange={handleRoleChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>User</em>;
                  }
                  return selected.join(', ');
                }}
              >
           <MenuItem disabled value="">
            <em>User</em>
          </MenuItem>
          {roleName.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
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
