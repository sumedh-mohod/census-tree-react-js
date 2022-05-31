import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AssignUserConfirmationDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This User is already Assinged to Team- dummy team. On confirm, It will remove him/her from the previously assinged team. Are you sure you want to continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>yes</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}