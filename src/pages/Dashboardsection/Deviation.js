import React from 'react';
import { Card, Grid, Typography, Container, Stack, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import DeviationImg from '../../Assets/deviation_leaf.png';

const Deviation = () => {
  const useStyles = makeStyles({
    success: {
      backgroundColor: '#C8FADE',
      color: '#214C50',
      border: '1px solid #214C50',
      borderRadius: '12px',
      padding: '10px 50px 0px 50px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
    darkSection: {
      backgroundColor: '#214C50',
      color: '#fff',
      borderRadius: '12px',
      fontWeight: 600,
      pointerEvents: 'none',
      fontSize: '20px',
      padding: '15px',
    },
  });
  const classes = useStyles();
  return (
    <>
      <Card className={classes.success}>
        <Grid container spacing={2} mt={1}>
          <Grid xs={1} md={1} sm={1}>
            <img src={DeviationImg} alt="devi" height="50%" />
          </Grid>
          <Grid xs={5} md={10} sm={5}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h5" sx={{ color: '#214C50', fontWeight: 600 }}>
                Deviation:
                <Typography variant="h6" style={{ fontWeight: 400, fontSize: '15px' }}>
                  It is showing the deviation between <b>Base Color Tree</b> and <b>Census Tree</b> is
                </Typography>
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={6} md={1} sm={6} mt={1}>
            <span className={classes.darkSection}>15%</span>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default Deviation;
