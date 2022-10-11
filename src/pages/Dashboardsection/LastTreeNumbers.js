import React from 'react';
import { Card, Grid, Typography, Container, Stack,Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import ProjectImg from '../../Assets/plant_team_tree.png';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';
// import UserListToolbar from '../../sections/@dashboard/user';

const LastTreeNumbers = () => {
  const filterByName = () => {};
  const useStyles = makeStyles({
    success: {
      backgroundColor: '#DDFAD1',
      color: '#507C59',
      border: '1px solid #507C59',
      fontSize: '15px',
      borderRadius: '5px',
      padding: '4px 10px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
    pending: {
      backgroundColor: '#efcbbd',
      color: '#CE5623',
      border: '1px solid #CE5623',
      fontSize: '15px',
      borderRadius: '5px',
      padding: '4px 10px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
  });
  const classes = useStyles();
  return (
    <>
      <Grid container item xs={12} md={12} sm={12} spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={8}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" gutterBottom>
              Last Tree Numbers(Council Name)
              <Typography variant="h6" style={{ fontWeight: 400 }}>
                It is showing current tree number of selected team
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* <UserListToolbar numSelected={0} placeHolder={'Search users...'} onFilterName={filterByName} /> */}
        </Grid>
      </Grid>

      <Container>
        <Grid container spacing={3}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} mb={2}>
              <Card style={{ padding: '50px', background: '#214C50' }}>
                <Grid container spacing={1}>
                  <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
                    <Typography variant="h4" mt={8}>
                    <Button variant="contained" className={classes.success} style={{padding: '4px 20px'}}>
                              TEAM-10
                            </Button>
                      <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }}>
                        AK-C6-0067
                        <Typography variant="h5" style={{ color: '#fff', fontSize: '18px' }}>
                          Last Tree Number
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                            The trees generated in <br />
                            this council till now.
                          </Typography>
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid container item xs={12} md={6} sm={6} spacing={3} mb={1}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h4" sx={{ color: '#fff' }}>
                          By Aakash Thakare
                          <Typography variant="h6" style={{ fontWeight: 400 }}>
                            Base Color
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Team Name
                          <Typography variant="h4" style={{ fontWeight: 600, fontSize: '15px' }}>
                            AKOLA GENI TEAM
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Ward
                          <Typography variant="h4" style={{ fontWeight: 600, fontSize: '15px' }}>
                            WARD: 08
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Contact Number
                          <Typography variant="h4" style={{ fontWeight: 600, fontSize: '15px' }}>
                            +91 - 9876123456
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Added Tree At
                          <Typography variant="h6" style={{ fontWeight: 400 }}>
                            <Button variant="contained" className={classes.pending}>
                              0:30 AM, 22 Jan 2022
                            </Button>
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 400 }}>
                          Sync Tree At
                          <Typography variant="h6" style={{ fontWeight: 400 }}>
                            <Button variant="contained" className={classes.success}>
                              0:30 AM, 22 Jan 2022
                            </Button>
                          </Typography>
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={3} sm={3} spacing={3} mb={1}>
                    <img src={ProjectImg} alt="plant" />
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

export default LastTreeNumbers;
