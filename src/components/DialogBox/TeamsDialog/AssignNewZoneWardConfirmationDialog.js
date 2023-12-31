import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AssignNewZoneWardConfirmationDialog(props) {
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
  }

  return (
    <div>
      <Dialog
        // open={open}
        open={isOpenConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Assigning new CZW to the Team will expired the current session of the user in Team and might lose the offline data. Please synch all the Offline data before proceeding.
          </DialogContentText>
          <br />
          <DialogContentText id="alert-dialog-description">
          Assigning new Council-Zone-Ward will Inactivate the previously assinged Council-Zone-Ward for this team. Are you sure you want to continue? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrueClose} >yes</Button>
          <Button onClick={handleClose}  autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}