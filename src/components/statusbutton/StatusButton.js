import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusButton(props) {
  // console.log('props....', props);
  const useStyles = makeStyles({
    active: {
      backgroundColor: '#214c50',
      borderRadius: '5px',
      padding: '5px 10px',
      color: '#fff',
      border: 'none',
      fontFamily: 'Poppins',
      fontSize: '12px',
    },

    inactive: {
      backgroundColor: '#e85454',
      borderRadius: '5px',
      padding: '5px 10px',
      color: '#fff',
      border: 'none',
      fontFamily: 'Poppins',
      fontSize: '12px',
    },
  });
  const classes = useStyles();
  return (
    <>
      {props.status === 1 ? (
        <button className={classes.active} >
          <b>Active</b>
        </button>
      ) : (
        <button className={classes.inactive} >
          <b>Inactive</b>
        </button>
      )}
     
      
    </>
  );
}
