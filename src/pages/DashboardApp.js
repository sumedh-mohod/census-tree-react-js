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
import { GetDashboardByCouncilId, getTeamsByCouncilId, getTeamDetailByCouncilTeam } from '../actions/DashboardAction';
import { ShowLoader } from '../actions/CommonAction';
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
import YesterdayHighLowCensus from './Dashboardsection/YesterdayHighLowCensus';
import TreeDetail from './Dashboardsection/TreeDetail';
import LastTreeNumbers from './Dashboardsection/LastTreeNumbers';
import Deviation from './Dashboardsection/Deviation';
import MasterData from './Dashboardsection/MasterData';
import { GetActiveCouncil } from '../actions/CouncilAction';
import FullLoader from '../components/Loader/FullLoader';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [councilId, setCouncilId] = useState(23);
  const [councilTeamChange, setcouncilTeamChange] = useState();
  const [data, setData] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log('......councilTeamChange', councilTeamChange);
  useEffect(() => {
    dispatch(GetDashboardByCouncilId(23));
    dispatch(GetActiveCouncil(1));
    dispatch(getTeamsByCouncilId(23));
  }, []);
  useEffect(() => {
    if (councilId) {
      dispatch(ShowLoader(true));
      dispatch(GetDashboardByCouncilId(councilId));
      dispatch(getTeamsByCouncilId(councilId));
    }
  }, [councilId]);
  useEffect(() => {
    if (councilTeamChange) {
      // console.log('onclick_council_id', councilId);
      dispatch(getTeamDetailByCouncilTeam(councilId, councilTeamChange));
    }
  }, [councilTeamChange]);
  const handleCouncil = (e) => {
    if (e.target.value) {
      setCouncilId(e.target.value);
    }
  };
  const {
    loggedUser,
    dashboardCouncil,
    council,
    showLoader,
    dashboardCouncilTeams,
    dashboardTeamDetailbyCouncilTeamId,
  } = useSelector((state) => ({
    loggedUser: state.auth.loggedUser,
    dashboardCouncil: state.dashboardCouncil.dashboardCouncil,
    dashboardCouncilTeams: state.dashboardCouncilTeams.dashboardCouncilTeams,
    dashboardTeamDetailbyCouncilTeamId: state,
    council: state.council.activeCouncil,
    showLoader: state.common.showLoader,
  }));
  // console.log('dashboardCouncil.............', dashboardCouncil);
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

  const handleCouncilTeam = (e) => {
    setcouncilTeamChange(e);
  };
  return (
    <>
      <FullLoader showLoader={showLoader} />
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
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <Deviation
              id="deviation"
              deviationPercent={`${dashboardCouncil?.council_records?.tree_counts?.deviation?.deviation_percentage}`}
              deviationMessage={`${dashboardCouncil?.council_records?.tree_counts?.deviation?.deviation_message}`}
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
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCard value={dashboardCouncil?.council_records?.work_type_counts?.base_color} index={0} />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCard
                      value={dashboardCouncil?.council_records?.work_type_counts?.base_color_on_site_qc}
                      index={1}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCard
                      value={dashboardCouncil?.council_records?.work_type_counts?.base_color_off_site_qc}
                      index={2}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard
                      value={dashboardCouncil?.council_records?.work_type_counts?.census}
                      census={'Census'}
                      index={0}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard
                      value={dashboardCouncil?.council_records?.work_type_counts?.census_on_site_qc}
                      census={'Census Onsite QC'}
                      index={1}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={4} mb={2}>
                    <WorktypeCensusCard
                      value={dashboardCouncil?.council_records?.work_type_counts?.census_off_site_qc}
                      census={'Census Offsite QC'}
                      index={2}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
            <br />
            <br />
            <Container id="highestBaseColor">
              {dashboardCouncil?.council_records?.highest_base_color_users.length === 0 ? (
                ''
              ) : (
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
                      It is showing Yesterdays Highest Base Color counts.{' '}
                      <span style={{ color: '#ff0000' }}>
                        (The Team , Council, Zone and ward is currently assigned entity to the user.)
                      </span>
                    </Typography>
                  </Typography>
                </Stack>
              )}

              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {dashboardCouncil?.council_records?.highest_base_color_users?.map((val, i) => (
                    <Grid item mb={2} xs={12} md={3} sm={3}>
                      <YesterdayHighLow slug={'high'} value={val} index={i} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lowestBaseColor">
              {dashboardCouncil?.council_records?.lowest_base_color_users.length === 0 ? (
                ''
              ) : (
                <Stack direction="row" justifyContent="space-between" mb={5} ml={-3}>
                  <Typography variant="h4" gutterBottom>
                    Yesterdays Lowest Base Color ({`${dashboardCouncil?.council_records?.council_details?.name}`})
                    <Typography variant="h6" style={{ fontWeight: 400 }}>
                      It is showing Yesterdays Lowest Base Color counts.{' '}
                      <span style={{ color: '#ff0000' }}>
                        (The Team , Council, Zone and ward is currently assigned entity to the user.)
                      </span>
                    </Typography>
                  </Typography>
                </Stack>
              )}

              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {dashboardCouncil?.council_records?.lowest_base_color_users?.map((val, i) => (
                    <Grid item xs={12} md={3} sm={3} mb={2}>
                      <YesterdayHighLow slug={'low'} value={val} index={i} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="highestCensus">
              {dashboardCouncil?.council_records?.highest_census_users.length === 0 ? null : (
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
                      It is showing Yesterdays Highest Census counts.{' '}
                      <span style={{ color: '#ff0000' }}>
                        (The Team , Council, Zone and ward is currently assigned entity to the user.)
                      </span>
                    </Typography>
                  </Typography>
                </Stack>
              )}
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {dashboardCouncil?.council_records?.highest_census_users?.map((val, i) => (
                    <Grid item xs={12} md={3} sm={3} mb={2}>
                      <YesterdayHighLowCensus slug={'high'} value={val} index={i} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lowestCensus">
            {dashboardCouncil?.council_records?.lowest_census_users.length === 0 ? null:
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
                    It is showing Yesterdays Highest Census counts.{' '}
                    <span style={{ color: '#ff0000' }}>
                      (The Team , Council, Zone and ward is currently assigned entity to the user.)
                    </span>
                  </Typography>
                </Typography>
              </Stack>}
              <Grid container spacing={3}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {dashboardCouncil?.council_records?.lowest_census_users?.map((val, i) => (
                    <Grid item xs={12} md={3} sm={3} mb={2}>
                      <YesterdayHighLowCensus slug={'low'} value={val} index={i} />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            <br />
            <Container id="lasttreeNumber">
              <LastTreeNumbers
                councilName={`${dashboardCouncil?.council_records?.council_details?.name}`}
                treeDetail={
                  dashboardTeamDetailbyCouncilTeamId?.dashboardTeamDetailbyCouncilTeamId
                    ?.dashboardTeamDetailbyCouncilTeamId
                }
                teams={dashboardCouncilTeams}
                handleCouncilTeamChange={handleCouncilTeam}
              />
            </Container>
            <br />
            <Container id="associateZero">
              <AssociateZeroTree value={dashboardCouncil?.council_records?.Unsynced_users} />
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
