
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
       style={{ backgroundColor: '#e85454',border: '1px solid #000',fontSize: '11px',borderRadius: '5px',fontWeight: 600  }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
