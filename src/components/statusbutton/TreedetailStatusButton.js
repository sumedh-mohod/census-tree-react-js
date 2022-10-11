import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
} from '@mui/material';
import './style.css';

export default function TreedetailStatusButton(props) {
  const { slug } = props;
  const useStyles = makeStyles({
    success: {
        backgroundColor: '#DDFAD1',
        color: '#43901C',
        border: '1px solid #43901C',
         fontSize: '15px',
         borderRadius: '5px',
         padding: '4px 25px',
         fontWeight: 600,
         pointerEvents: 'none'
    },
    pending: {
        backgroundColor: '#F8EED4',
        color: '#B6781A',
        border: '1px solid #B6781A',
         fontSize: '15px',
         borderRadius: '5px',
         padding: '4px 25px',
         fontWeight: 600,
         pointerEvents: 'none'
    },
    danger: {
        backgroundColor: '#F6D2D8',
        color: '#B42B3E',
        border: '1px solid #B42B3E',
         fontSize: '15px',
         borderRadius: '5px',
         padding: '4px 25px',
         fontWeight: 600,
         pointerEvents: 'none'
    },
    black: {
        color: '#000'
    }
  });
  const classes = useStyles();
  return (
    <>
     
    
       <Button
       variant="contained"
       className={slug === 'success'?classes.success: slug === 'pending'? classes.pending: slug === 'danger'? classes.danger : classes.black}
     >
       70890
     </Button>
      
    </>
  );
}
