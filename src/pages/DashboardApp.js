import { faker } from '@faker-js/faker';

import { useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Card } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import AssociateZeroTree from './Dashboardsection/AssociateZeroTree';
import YesterdayLoggedIn from './Dashboardsection/YesterdayLoggedIn';
import LightCard from './Dashboardsection/LightCard';
import DarkCard from './Dashboardsection/DarkCard';
import CommanCard from './Dashboardsection/CommanCard';
import DashboardFooter from './Dashboardsection/DashboardFooter';
import AssociateCard from './Dashboardsection/AssociateCard';
import UsersCard from './Dashboardsection/UsersCard';
import WorktypeCard from './Dashboardsection/WorktypeCard';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { loggedUser, showLoader } = useSelector((state) => ({
    loggedUser: state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));
  console.log('showLoader', showLoader);
  const ongoingProject = {
    count: 136,
    title: 'Ongoing Projects',
    subtitle: 'It is showing count of all ongoing projects',
  };
  const completedProject = {
    count: 70,
    title: 'Completed Projects',
    subtitle: 'It is showing count of all ongoing projects',
  };

  const commanCardValue = [
    {
      count: 12897,
      title: 'Trees',
      color: 'red',
      subtitle: 'It is showing all trees counts and its Details in selected council.',
    },
    {
      count: 9670,
      title: 'Denied Property',
      color: 'orange',
      subtitle: 'It is showing all denied property counts and details of its in selected council.',
    },
    {
      count: 2390,
      title: 'No Tree Properties',
      color: 'lightGreen',
      subtitle: 'It is showing all No Tree Properties counts and details of it in selected council',
    },
    {
      count: 5670,
      title: 'Teams',
      color: 'green',
      subtitle: 'It is showing all teams counts and details of its inselected council.',
    },
    {
      count: 23900,
      title: 'Wards',
      color: 'orange',
      subtitle: 'It is showing all wards counts and details of it inselected council.',
    },
    {
      count: 12897,
      title: 'Zones',
      color: 'green',
      subtitle: 'It is showing all zones counts and details of it inselected council.',
    },
  ];

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl" style={{ borderBottom: '1px solid #dbd9d9' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Welcome  to {loggedUser?.name},
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              {loggedUser?.designation}
            </Typography>
          </Typography>
        </Stack>
        <br />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Council name
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            It is showing count statistics
            </Typography>
          </Typography>
        </Stack>
        <Container>
          <Grid container spacing={3}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <AssociateCard value={commanCardValue[0]} />
              </Grid>
              <Grid item xs={3}>
                <UsersCard />
              </Grid>
              <Grid item xs={3}>
                <UsersCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <br />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
          Count of WorkType(CouncilName)
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            It is showing work report by work type
            </Typography>
          </Typography>
        </Stack>
        <br/>
        <Container >
          <Grid container spacing={3}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item xs={4} mb={2}>
              <WorktypeCard />
              </Grid>
              <Grid item xs={4} mb={2}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={4} mb={2}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={4}>
              <WorktypeCard />
              </Grid>
              <Grid item xs={4}>
                <WorktypeCard />
              </Grid>
              <Grid item xs={4}>
                <WorktypeCard />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <br/>
        <br/>
        <br/>
        <Container>
          <Grid container spacing={3}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <LightCard projects={ongoingProject} />
              </Grid>
              <Grid item xs={4}>
                <LightCard projects={completedProject} />
              </Grid>
              <Grid item xs={4}>
                <DarkCard />
              </Grid>
            </Grid>
          </Grid>
          <br /> <br />
          <Grid container spacing={3}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4} mb={2}>
                <CommanCard value={commanCardValue[0]} />
              </Grid>
              <Grid item xs={4}>
                <CommanCard value={commanCardValue[1]} />
              </Grid>
              <Grid item xs={4}>
                <CommanCard value={commanCardValue[2]} />
              </Grid>
              <Grid item xs={4}>
                <CommanCard value={commanCardValue[3]} />
              </Grid>
              <Grid item xs={4}>
                <CommanCard value={commanCardValue[4]} />
              </Grid>
              <Grid item xs={4}>
                <CommanCard value={commanCardValue[5]} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <AssociateZeroTree />
        <br />
        <YesterdayLoggedIn />
        <br />
        <br />
        <br />
        <DashboardFooter />
      </Container>
    </Page>
  );
}
