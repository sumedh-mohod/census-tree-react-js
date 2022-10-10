import React from 'react';
import { Card, Grid, Typography, Container, Stack } from '@mui/material';
import ProjectImg from '../../Assets/project_ongoing.png';
// import UserListToolbar from '../../sections/@dashboard/user';

const LastTreeNumbers = () => {
  const filterByName =()=>{}
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
                  <Grid container item xs={12} md={4} sm={3} spacing={3} mb={1}>
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
                  <Grid container item xs={12} md={6} sm={6} spacing={3} mb={1}>
                    <Grid item xs={12} sm={6} md={6}>
                      1
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      2
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      3
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      4
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      5
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      6
                    </Grid>
                  </Grid>
                  <Grid container item xs={12} md={2} sm={3} spacing={3} mb={1}>
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
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LastTreeNumbers;
