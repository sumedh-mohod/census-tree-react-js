import React from 'react';
import {
    CircularProgress,
  } from '@mui/material';

const Loader = () => {
  return (
    <>
     <div style={{ display: 'flex',paddingLeft: '150px', alignItems: 'center'}}>
                <CircularProgress  style={{color: '#214c50'}} />
              </div>
    </>
  )
}

export default Loader