import React from 'react';

import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusPendngButton(props) {
  // console.log('props....', props);
  
  return (
    <>
     
      {props.qcStatus === 'Pending'? 
       <Button
       variant="contained"
       style={{ backgroundColor: '#E8762F',border: '1px solid #000',fontSize: '11px',borderRadius: '5px',fontWeight: 600  }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
