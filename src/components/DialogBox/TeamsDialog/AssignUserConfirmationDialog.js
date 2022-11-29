import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import caution from '../../../Assets/caution.png';

export default function AssignUserConfirmationDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { isOpenConfirm } = props;
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose(false);
  };

  const handleTrueClose = () => {
    props.handleClose(true);
  };

  return (
    <div>
      <Dialog
        open={isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{''}</DialogTitle>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <img src={caution} alt="img" />
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Assigning user to new team will expire the current session of the user and might lose the offline data.
            Please synch all the Offline data before proceeding.
          </DialogContentText>
          <br />
          <DialogContentText id="alert-dialog-description">
            Assigning User to the new team will remove him/her from the previously assigned team. Are you sure you want
            to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrueClose} variant="contained">yes</Button>
          <Button onClick={handleClose} style={{ backgroundColor: '#e85454', color: '#fff' }} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
