import { faker } from '@faker-js/faker';

import { useSelector } from 'react-redux';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Stack } from '@mui/material';
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

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const { loggedUser, showLoader } = useSelector((state)=>({
    loggedUser:state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }))
console.log('showLoader',showLoader);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Welcome  to {loggedUser?.name},
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            {loggedUser?.designation}
            </Typography>
          </Typography>
        </Stack>
        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Weekly Sales" total={714000} color='info' icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="info" icon={'ant-design:windows-filled'} />
          </Grid>

       </Grid> */}
      </Container>
    </Page>
  );
}
