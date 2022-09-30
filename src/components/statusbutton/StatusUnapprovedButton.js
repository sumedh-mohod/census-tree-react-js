
import React from 'react';

import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusApprovedButton(props) {
  // console.log('props....', props);
  
  return (
    <>
     
      {props.qcStatus === 'Unapproved'? 
       <Button
       variant="contained"
       style={{ backgroundColor: '#F6D2D8',border: '1px solid #B42B3E',color: '#B42B3E',fontSize: '12px',borderRadius: '5px',fontWeight: 600  }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
