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
       style={{ backgroundColor: '#3B8038',border: '1px solid #000', fontSize: '11px',borderRadius: '5px',fontWeight: 600 }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
