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
import Quotes from '../Assets/quotes.png';
import TreeBottom from '../Assets/trees_bottom.png';
import LightCard from './Dashboardsection/LightCard';
import DarkCard from './Dashboardsection/DarkCard';
import CommanCard from './Dashboardsection/CommanCard';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { loggedUser, showLoader } = useSelector((state) => ({
    loggedUser: state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));
  // console.log('showLoader', showLoader);
  const ongoingProject = {
    count: 136,
    title: 'Ongoing Projects',
    subtitle: 'It is showing count of all ongoing projects'
  }
  const completedProject = {
    count: 70,
    title: 'Completed Projects',
    subtitle: 'It is showing count of all ongoing projects'
  }

  const commanCardValue = [
   {
    count: 12897,
    title: 'Trees',
    subtitle: 'It is showing all trees counts and its Details in selected council.'
   },
   {
    count: 9670,
    title: 'Denied Property',
    subtitle: 'It is showing all denied property counts and details of its in selected council.'
   },
   {
    count: 2390,
    title: 'No Tree Properties',
    subtitle: 'It is showing all No Tree Properties counts and details of it in selected council'
   },
    {
    count: 2390,
    title: 'No Tree Properties',
    subtitle: 'It is showing all No Tree Properties counts and details of it in selected council'
   }
  ]
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
        <br />
        

        {/* <Container>
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
             
              <Grid item xs={4}>
                <CommanCard value={commanCardValue} />
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
        <Container>
          <Card style={{ padding: '20px', background: 'none', boxShadow: 'none' }}>
            <Grid container spacing={3} style={{ marginBottom: '70px' }}>
              <Grid item xs={12} sm={6} md={3} mt={2}>
                <span style={{ fontSize: '50px', fontWeight: 600, color: '#819881', lineHeight: '0.5' }}>
                  tree
                  {'\n'}census
                </span>
                <br />
                <Typography variant="h6" style={{ color: '#737373' }}>
                  <b>Version 1.0</b>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} md={9}>
                <img src={Quotes} alt="img" height="30px" width="30px" />
                <i>
                  It is not so much for its beauty that the forest makes a claim upon men’s hearts, as for that subtle
                  something,that quality of air that emanation from old trees,that so wonderfully changes and renews
                  aweary spirit.
                </i>
              </Grid>
            </Grid>
            <img
              src={TreeBottom}
              alt="img"
              height="70px"
              width="200px"
              style={{ position: 'absolute', bottom: '0', right: '0' }}
            />
          </Card>
        </Container> */}
      </Container>
    </Page>
  );
}
