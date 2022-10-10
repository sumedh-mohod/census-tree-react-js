import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import ProjectImg from '../../Assets/project_ongoing.png';

const TreeDetail = () => {
  return (
    <>
      <Card style={{padding:'50px',background: '#214C50'}}>
      <Grid container spacing={1}>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5" style={{ color: '#fff' }}>
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5">
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5">
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item md={2} xs={12} sm={2} spacing={3} mb={1}>
        <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5">
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
       
          
        </Grid>
        <Grid container item md={1} sm={1} xs={12} spacing={3} mb={1}>
        <img src={ProjectImg} alt={'tree'} style={{marginTop: '-20px'}}/>
       
          
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5" style={{ color: '#fff'}}>
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5"  >
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5">
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={3} sm={3} spacing={3} mt={1}>
          <Typography variant="h4" style={{ color: '#fff', fontWeight: 600 }} mt={0.7}>
            9,080
            <Typography variant="h5">
              Associates
              <Typography variant="h6" sx={{ fontWeight: 400 }}>
                The trees generated in <br />
                this council till now.
              </Typography>
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      </Card>
    </>
  );
};

export default TreeDetail;
