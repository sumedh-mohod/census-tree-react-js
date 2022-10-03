import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import  ImageGallery  from 'react-image-gallery';
import { Box, Card, Modal, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import FailImage from "../../../Assets/fail.svg";
import DefaultInput from '../../Inputs/DefaultInput';
import "react-image-gallery/styles/css/image-gallery.css";
import Scrollbar from "../../Scrollbar";
import { UserListHead } from '../../../sections/@dashboard/user';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 0,
  };

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

const TABLE_HEAD = [
    { id: 'row', label: 'Row', alignRight: false },
    { id: 'attribute', label: 'Attribute', alignRight: false },
    { id: 'error', label: 'Error', alignRight: false },
  ];

export default function PropertyErrorDialog(props) {
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
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState('Status')
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

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
    
//     <Modal
//     open={isOpen}
//     onClose={handleClose}
//     aria-labelledby="modal-modal-title"
//     aria-describedby="modal-modal-description"
//   >
<Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          <div style={{display:'flex',color:'red',alignItems:'center'}}>
          <img src={FailImage} alt="failed" style={{marginRight:'20px'}}  />
          {"Error while importing Properties"}
          </div>
        </BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
    <Card>
    <Scrollbar>
            <TableContainer sx={{ minWidth: 800,minHeight:'90vh' }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     {data?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                        <TableCell align="left">{option.row}</TableCell>
                        <TableCell align="left">{option.attribute}</TableCell>
                        <TableCell align="left">
                         {option.error}
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          </Card>
    </DialogContent>
  {/* </Modal> */}
  </Dialog>
    
  );
}
