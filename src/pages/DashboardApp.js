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
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { loggedUser, showLoader } = useSelector((state) => ({
    loggedUser: state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));
  console.log('showLoader', showLoader);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Welcome {loggedUser?.name},
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              {loggedUser?.designation}
            </Typography>
          </Typography>
        </Stack>
        <AssociateZeroTree />
        <br />
        <YesterdayLoggedIn />
        <br />
        <br />
        <br />
        <Container>
          <Card style={{ padding: '20px', background: 'none', boxShadow: 'none' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <span style={{ fontSize: '40px', fontWeight: 600, color: '#819881' }}>
                  tree
                  {'\n'}census
                </span>
                <br />
                Version 1.0
              </Grid>

              <Grid item xs={12} sm={6} md={9}>
                It is not so much for its beauty that the forest makes a claim upon men’s hearts, as for that subtle
                something,that quality of air that emanation from old trees,that so wonderfully changes and renews
                aweary spirit.
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Container>
    </Page>
  );
}
