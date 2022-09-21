import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
} from '@mui/material';
import './style.css';

export default function AllocateButton(props) {
  console.log('props....', props);
  const useStyles = makeStyles({
    active: {
      backgroundColor: '#214c50',
      borderRadius: '5px',
      padding: '5px 10px',
      color: '#fff',
      border: 'none',
      fontFamily: 'Poppins',
    },

    inactive: {
      backgroundColor: '#e85454',
      borderRadius: '5px',
      padding: '5px 10px',
      color: '#fff',
      border: 'none',
      fontFamily: 'Poppins',
    },
  });
  const classes = useStyles();
  return (
    <>
      {props.status === 'Allocated' ? (
        <button className={classes.active} style={{boxShadow: 'none'}}>
          <b>Allocated</b>
        </button>
      ) : (
        <button className={classes.inactive} style={{boxShadow: 'none'}}>
          <b>Deallocated</b>
        </button>
      )}
     
      
    </>
  );
}
