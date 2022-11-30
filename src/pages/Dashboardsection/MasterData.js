import React from 'react';
import { Card, Grid, Typography, Container, Stack, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@material-ui/core/styles';
import ProjectImg from '../../Assets/plant_master_data.png';
import TreedetailStatusButton from '../../components/statusbutton/TreedetailStatusButton';
// import UserListToolbar from '../../sections/@dashboard/user';

const MasterData = (props) => {
  // console.log("masterdata", props);
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
    border: {
      borderBottom: '1px solid #9b9393',
      width: '60%',
      // margin: '10px'
    },
  });
  const classes = useStyles();
  return (
    <>
      <Grid container item xs={12} md={12} sm={12} spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={8}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginLeft: '-24px' }}>
            <Typography variant="h4" gutterBottom>
              Master Data
              <Typography variant="h6" style={{ fontWeight: 400 }}>
                It is showing all your master data counts
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* <UserListToolbar numSelected={0} placeHolder={'Search users...'} onFilterName={filterByName} /> */}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <img
            src={ProjectImg}
            alt="plant"
            height={120}
            width={120}
            style={{ position: 'absolute', marginTop: '-50px', overflow: 'visible', zIndex: 999999, right: '5%' }}
          />
          <Grid item xs={12}>
            <Card style={{ padding: '50px 50px 25px 50px', background: '#214C50' }}>
              <Grid container spacing={1}>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Councils
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Councils counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={2}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                      {props?.value?.councils}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Designation
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Designation counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={2}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.designations}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Districts
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Districts counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={2}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.districts}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Location Types
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Location Types counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.location_types}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Property Types
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Property Types counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.property_types}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        QC Remark
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing QC Remark counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.qc_remarks}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
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
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.roles}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        States
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing States counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.states}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mb={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={3}>
                        Talukas
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Talukas counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.talukas}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Conditions
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Tree Conditions counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.tree_conditions}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Diseases
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Tree Diseases counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.tree_diseases}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Families
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Tree Families counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.tree_families}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Name
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Tree Name counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.tree_names}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Tree Types
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Tree Types counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.tree_types}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3} className={classes.border}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Wards
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Wards counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.wards}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={4} sm={4} spacing={3}>
                  <Grid xs={9} md={8} sm={8} spacing={1} mt={1}>
                    <Typography
                      variant="h4"
                      style={{ color: '#fff', fontWeight: 600 }}
                      mt={2}
                      sx={{ paddingLeft: '10px', paddingBottom: '10px' }}
                    >
                      <Typography variant="h5" style={{ fontSize: '16px' }} mt={1}>
                        Zones
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>
                          It is showing Zones counts
                        </Typography>
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid xs={3} md={4} sm={4} spacing={1} mt={3}>
                    <Typography variant="h4" style={{ color: '#D4E489', fontWeight: 600, fontSize: '35px' }} mt={1}>
                    {props?.value?.zones}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MasterData;
