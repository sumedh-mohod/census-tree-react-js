import React from 'react';

import {
  Button,
} from '@mui/material';
import './style.css';

export default function StatusApprovedButton(props) {
  // console.log('props....', props);
  
  return (
    <>
     
      {props.count === 0? 
       <Button
       variant="contained"
       style={{ backgroundColor: '#a6a6a6',padding: '2px 5px', minWidth: '34px', borderRadius: '5px'}}
     >
       {props.count}
     </Button>:<Button
       variant="contained"
       style={{ backgroundColor: '#214c50',padding: '2px 5px', minWidth: '34px', borderRadius: '5px'}}
     >
       {props.count}
     </Button>
      }
      
    </>
  );
}
