import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function WarningMessageDialog(props) {
  const [open, setOpen] = React.useState(false);
  const { isOpenConfirm ,message} = props;
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
          {message} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTrueClose} style={{boxShadow: 'none'}}   variant="contained">yes</Button>
          <Button onClick={handleClose} style={{boxShadow: 'none',backgroundColor: '#e85454',color: '#fff'}}  autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}