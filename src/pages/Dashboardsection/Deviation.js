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
      padding: '10px 25px 0px 25px',
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
      <Container>
        <Grid container spacing={3}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Card className={classes.success}>
                <Grid container spacing={1} mt={0.4} mb={1}>
                  <Grid xs={6} md={11} sm={6}>
                    <Stack direction="row" alignItems="center">
                      <img src={DeviationImg} alt="devi" height="40px" width="40px" />
                      <Typography variant="h5" sx={{ color: '#214C50', fontWeight: 600, marginLeft: '20px' }}>
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Deviation;
