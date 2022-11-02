import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @mui
import { Grid, Container, Typography, Stack, Select, CircularProgress } from '@mui/material';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
// components
import { Link, animateScroll as scroll } from 'react-scroll';
import Page from '../components/Page';
import { GetDashboardByCouncilId } from '../actions/DashboardAction';
import AssociateZeroTree from './Dashboardsection/AssociateZeroTree';
import YesterdayLoggedIn from './Dashboardsection/YesterdayLoggedIn';
import LightCard from './Dashboardsection/LightCard';
import DarkCard from './Dashboardsection/DarkCard';
import CommanCard from './Dashboardsection/CommanCard';
import DashboardFooter from './Dashboardsection/DashboardFooter';
import AssociateCard from './Dashboardsection/AssociateCard';
import UsersCard from './Dashboardsection/UsersCard';
import WorktypeCard from './Dashboardsection/WorktypeCard';
import WorktypeCensusCard from './Dashboardsection/WorktypeCensusCard';
import YesterdayHighLow from './Dashboardsection/YesterdayHighLow';
import TreeDetail from './Dashboardsection/TreeDetail';
import LastTreeNumbers from './Dashboardsection/LastTreeNumbers';
import Deviation from './Dashboardsection/Deviation';
import MasterData from './Dashboardsection/MasterData';
import { GetActiveCouncil } from '../actions/CouncilAction';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [councilId, setCouncilId] = useState(null);
  const [data, setData] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(GetDashboardByCouncilId(23));
    dispatch(GetActiveCouncil(1));
  }, []);
  useEffect(() => {
    if (councilId) {
      // console.log('councilclicked', councilId);
      dispatch(GetDashboardByCouncilId(councilId));
    }
    // console.log('councilId unclicked');
  }, [councilId]);
  const handleCouncil = (e) => {
    if (e.target.value) {
      // console.log('clicked', e.target.value);
      setCouncilId(e.target.value);
    }
  };
  // const theme = useTheme();
  const { loggedUser, dashboardCouncil, council } = useSelector((state) => ({
    loggedUser: state.auth.loggedUser,
    dashboardCouncil: state.dashboardCouncil.dashboardCouncil,
    council: state.council.activeCouncil,
  }));
  console.log('data', dashboardCouncil);

  const ongoingProject = {
    count: `${dashboardCouncil?.overall_records?.total_ongoing_projects}`,
    title: 'Ongoing Projects',
    subtitle: 'It is showing count of all ongoing projects',
  };
  const completedProject = {
    count: `${dashboardCouncil?.overall_records?.total_completed_projects}`,
    title: 'Completed Projects',
    subtitle: 'It is showing count of all ongoing projects',
  };

  const commanCardValue = [
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_trees}`,
      title: 'Trees',
      color: 'red',
      subtitle: 'It is showing all trees counts and its Details in selected council.',
    },
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_denied_properties}`,
      title: 'Denied Property',
      color: 'orange',
      subtitle: 'It is showing all denied property counts and details of its in selected council.',
    },
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_no_trees_properties}`,
      title: 'No Tree Properties',
      color: 'lightGreen',
      subtitle: 'It is showing all No Tree Properties counts and details of it in selected council',
    },
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_teams}`,
      title: 'Teams',
      color: 'green',
      subtitle: 'It is showing all teams counts and details of its inselected council.',
    },
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_wards}`,
      title: 'Wards',
      color: 'orange',
      subtitle: 'It is showing all wards counts and details of it inselected council.',
    },
    {
      count: `${dashboardCouncil?.council_records?.count_statistics?.total_zones}`,
      title: 'Zones',
      color: 'green',
      subtitle: 'It is showing all zones counts and details of it inselected council.',
    },
  ];

  const censusData = [
    { day: 'Today', date: '01 Nov 2022', count: 0 },
    { day: 'Yesterday', date: '31 Oct 2022', count: 2 },
    { day: 'Ereyesterday', date: '30 Oct 2022', count: 0 },
  ];
  const useStyles = makeStyles({
    icon: {
      fill: '#214C50',
    },
  });
  const classes = useStyles();
  return (
    <>
      {!dashboardCouncil ? (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
         <CircularProgress style={{ color: '#214c50' }} />
       </div>
      ) : (
        <Page title="Dashboard">
          <Container maxWidth="xl" style={{ borderBottom: '1px solid #dbd9d9' }} id="projectSection">
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
              <Typography variant="h4" gutterBottom>
                Welcome to {loggedUser?.name},
                <Typography variant="h6" style={{ fontWeight: 400 }}>
                  {loggedUser?.designation}
                </Typography>
              </Typography>
            </Stack>
            <br />
            <br />

            <Container>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={4} sm={4}>
                    <LightCard projects={ongoingProject} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <LightCard projects={completedProject} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <DarkCard totalAssociate={dashboardCouncil?.overall_records?.total_associates} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />

            <Container id="councilSection">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  {/* Forest Tree Census <span style={{ fontSize: '14px', fontWeight: '500' }}>(12-03-2022 to 17-10-2022)</span> */}
                  <Typography variant="h4" gutterBottom>
                    {dashboardCouncil?.council_records?.council_details?.name}{' '}
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>
                      (
                      {dashboardCouncil?.council_records?.council_details?.project_start_date
                        ? dashboardCouncil?.council_records?.council_details?.project_start_date
                            .split('-')
                            .reverse()
                            .join('-')
                        : '--'}{' '}
                      to{' '}
                      {dashboardCouncil?.council_records?.council_details?.project_end_date
                        ? dashboardCouncil?.council_records?.council_details?.project_end_date
                            .split('-')
                            .reverse()
                            .join('-')
                        : ' --'}
                      )
                    </span>
                    <Typography variant="h6" style={{ fontWeight: 400 }}>
                      It is showing count statistics
                    </Typography>
                  </Typography>
                </Typography>

                <Typography variant="h6" style={{ fontWeight: 400 }}>
                  <Select
                    id="state"
                    displayEmpty
                    style={{ height: 45, width: '250px', background: '#fff' }}
                    onChange={(e) => handleCouncil(e)}
                    // placeholder={'Select Council'}
                    renderValue={
                      dashboardCouncil?.council_records?.council_details?.name === ''
                        ? ''
                        : () => `${dashboardCouncil?.council_records?.council_details?.name}`
                    }
                    // renderValue={() => `${dashboardCouncil?.council_records?.council_details?.name}`}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Council Name</em>
                    </MenuItem>
                    {council?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={6} sm={6}>
                    <AssociateCard
                      totalAssociate={`${dashboardCouncil?.council_records?.count_statistics?.total_associates}`}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3}>
                    <UsersCard
                      totalUser={dashboardCouncil?.council_records?.count_statistics?.total_base_color_user}
                      title={'Base Color User'}
                      totalOnsiteQc={dashboardCouncil?.council_records?.count_statistics?.total_base_color_on_site_qc}
                      totalOffsiteQc={dashboardCouncil?.council_records?.count_statistics?.total_base_color_off_site_qc}
                      onsiteSubtitle={'Base Color Onsite QC'}
                      offsiteSubtitle={'Base Color Offsite QC'}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3}>
                    <UsersCard
                      totalUser={dashboardCouncil?.council_records?.count_statistics?.total_census_user}
                      title={'Census Users'}
                      totalOnsiteQc={dashboardCouncil?.council_records?.count_statistics?.total_census_user}
                      totalOffsiteQc={dashboardCouncil?.council_records?.count_statistics?.total_census_offsite_qc}
                      onsiteSubtitle={'Census Onsite QC'}
                      offsiteSubtitle={'Census Offsite QC'}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <br />
            <Container id="commanCard">
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <CommanCard value={commanCardValue[0]} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <CommanCard value={commanCardValue[1]} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <CommanCard value={commanCardValue[2]} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <CommanCard value={commanCardValue[3]} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <CommanCard value={commanCardValue[4]} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4}>
                    <CommanCard value={commanCardValue[5]} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="treeDetail">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  Trees Details ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing tree details
                  </Typography>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} mb={2}>
                    {dashboardCouncil ? (
                      <TreeDetail treeCount={dashboardCouncil?.council_records?.tree_counts} />
                    ) : null}
                    {/* <TreeDetail treeCount={dashboardCouncil?.council_records?.tree_counts}/> */}
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Deviation
              id="deviation"
              deviationPercent={`${dashboardCouncil?.council_records?.tree_counts?.deviation?.deviation_percentage}`}
            />
            <br />
            <Container id="workType">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  Count of WorkType ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing work report by work type
                  </Typography>
                </Typography>
              </Stack>
              <br />
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {dashboardCouncil?.council_records?.work_type_count?.base_color?.map((val, i) => (
                    <Grid item xs={12} md={4} sm={4} mb={2}>
                      <WorktypeCard value={val} index={i} />
                    </Grid>
                  ))}
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard census={'Census'} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard census={'Census Onsite QC'} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard census={'Base Color Offsite QC'} />
                  </Grid>
                  {/* <Grid item xs={12} md={4} sm={4} mb={2}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={12} md={4} sm={4} mb={2}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={12} md={4} sm={4}>
                <WorktypeCard />
              </Grid> */}
                </Grid>
              </Grid>
            </Container>
            <br />
            <br />
            <Container id="highestBaseColor">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  Yesterdays Highest Base Color ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing Yesterdays Highest Base Color counts
                  </Typography>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item mb={2} xs={12} md={3} sm={3}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lowestBaseColor">
              <Stack direction="row" justifyContent="space-between" mb={5} ml={-3}>
                <Typography variant="h4" gutterBottom>
                  Yesterdays Lowest Base Color ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing Yesterdays Lowest Base Color counts
                  </Typography>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="highestCensus">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  Yesterdays Highest Census ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing Yesterdays Highest Census counts
                  </Typography>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'high'} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lowestCensus">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={5}
                sx={{ marginLeft: '-24px' }}
              >
                <Typography variant="h4" gutterBottom>
                  Yesterdays Lowest Census({`${dashboardCouncil?.council_records?.council_details?.name}`})
                  <Typography variant="h6" style={{ fontWeight: 400 }}>
                    It is showing Yesterdays Highest Census counts
                  </Typography>
                </Typography>
              </Stack>
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                  <Grid item xs={12} md={3} sm={3} mb={2}>
                    <YesterdayHighLow slug={'low'} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lasttreeNumber">
              <LastTreeNumbers councilName={`${dashboardCouncil?.council_records?.council_details?.name}`} />
            </Container>
            <br />
            <Container id="associateZero">
              <AssociateZeroTree />
            </Container>
            <br />
            <Container id="yesterdayLogged">
              <YesterdayLoggedIn />
            </Container>
            <br />
            <Container id="masterData">
              <MasterData />
            </Container>
            <br />
            <br />
            <DashboardFooter />
          </Container>
          <div style={{ position: 'fixed', top: '40%', right: 4, zIndex: '9999999' }}>
            <FlipCameraAndroidIcon
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              style={{
                color: '#fff',
                background: '#000',
                borderRadius: '30px',
                padding: '15px',
                fontSize: '60px',
                marginBottom: '-5px',
                cursor: 'pointer',
              }}
            />

            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              style={{ zIndex: 9999999 }}
            >
              <Link activeClass="active" to="projectSection" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Project
                </MenuItem>
              </Link>

              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="treeDetail" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Tree Details
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="workType" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Work Reports
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="highestBaseColor" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Hi/Lo Base Color
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="lasttreeNumber" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Last Tree Numbers
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="associateZero" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  0 Tree Sync Associates
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="yesterdayLogged" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Yesterday LoggedIn Associates
                </MenuItem>
              </Link>
              <Divider style={{ marginTop: 0, marginBottom: 0 }} />
              <Link activeClass="active" to="masterData" spy smooth offset={-70} duration={1000}>
                <MenuItem onClick={handleClose} sx={{ color: '#808484' }}>
                  Master Data
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Page>
      )}
    </>
  );
}
