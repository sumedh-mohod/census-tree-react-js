import React from 'react';
import { Card, Grid, Typography, Container, Stack, Button } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import ProjectImg from '../../Assets/plant_team_tree.png';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';
// import UserListToolbar from '../../sections/@dashboard/user';

const MasterData = () => {
  const filterByName = () => {};
  const useStyles = makeStyles({
    success: {
      backgroundColor: '#DDFAD1',
      color: '#507C59',
      border: '1px solid #507C59',
      fontSize: '12px',
      borderRadius: '5px',
      padding: '4px 10px',
      fontWeight: 600,
      pointerEvents: 'none',
    },
    pending: {
      backgroundColor: '#efcbbd',
      color: '#CE5623',
      border: '1px solid #CE5623',
      fontSize: '12px',
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
            <Grid item xs={12}>
              <Card style={{ padding: '50px 50px 25px 50px', background: '#214C50' }}>
                <Grid container spacing={1}>
                  <Grid container item xs={12} md={4} sm={3} spacing={3} mb={1}>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                      <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Roles
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                      <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        10
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Designations
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        20
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        States
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        80
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Dictrict
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        180
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={4} sm={6} spacing={3} mb={1}>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Council
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        9897
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Types
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        30
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Families
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        67
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Conditions
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        34
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={4} sm={3} spacing={3} mb={1}>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Location Type
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing roles counts
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        18
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                          Approved
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                            It is showing approved
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        10
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                          Approved
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                            It is showing approved
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        10
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={8} sm={3} spacing={1} mb={1}>
                    <Typography
                        variant="h4"
                        style={{ color: '#fff', fontWeight: 600 }}
                        mt={2}
                        sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                      >
                        <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                          Approved
                          <Typography variant="h6" sx={{ fontWeight: 400 }}>
                            It is showing approved
                          </Typography>
                        </Typography>
                      </Typography>
                    </Grid>
                    <Grid xs={12} md={4} sm={3} spacing={1} mb={1}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                        10
                      </Typography>
                    </Grid>
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

export default MasterData;
