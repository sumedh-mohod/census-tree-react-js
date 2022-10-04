import React from 'react'
import {
    Backdrop,
    CircularProgress
  } from '@mui/material';

const FullLoader = (props) => {
  const { showLoader } = props;
  return (
    <>
     <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default FullLoader