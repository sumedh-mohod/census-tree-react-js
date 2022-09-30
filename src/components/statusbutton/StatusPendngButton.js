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
       style={{ backgroundColor: '#F8EED4',border: '1px solid #B6781A',color: '#B6781A',fontSize: '12px',borderRadius: '5px',fontWeight: 600  }}
     >
       {props.qcStatus}
     </Button>:''
      }
      
    </>
  );
}
