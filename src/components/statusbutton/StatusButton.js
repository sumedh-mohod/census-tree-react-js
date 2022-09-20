import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusButton(props) {
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
      {props.status === 1 ? (
        <Button className={classes.active} style={{boxShadow: 'none'}}>
          <b>Active</b>
        </Button>
      ) : (
        <Button className={classes.inactive} style={{boxShadow: 'none'}}>
          <b>Inactive</b>
        </Button>
      )}
     
      
    </>
  );
}
