import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './style.css';

export default function StatusButton(props) {
  const { status } = props;
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
      {status === 1 ? (
        <button className={classes.active}>
          <b>Active</b>
        </button>
      ) : (
        <button className={classes.inactive}>
          <b>Inactive</b>
        </button>
      )}
    </>
  );
}
