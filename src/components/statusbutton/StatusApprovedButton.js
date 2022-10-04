import React from 'react';

import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusApprovedButton(props) {
  // console.log('props....', props);
  
  return (
    <>
     
      {props.qcStatus === 'Approved'? 
       <Button
       variant="contained"
       style={{ backgroundColor: '#DDFAD1',color: '#43901C',border: '1px solid #43901C', fontSize: '12px',borderRadius: '5px',fontWeight: 600 }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
