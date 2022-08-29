import React from 'react'
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function TreeReports() {
  return (
    <div role="presentation" >
    <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000"}} separator='>'>
        <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
          Reports
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
     Tree Reports
        </Typography>
    </Breadcrumbs>
  </div>
  )
}

export default TreeReports
