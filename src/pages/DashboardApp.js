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
      <Container maxWidth="xl" style={{borderBottom: '1px solid #dbd9d9'}}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Welcome {loggedUser?.name},
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              {loggedUser?.designation}
            </Typography>
          </Typography>
        </Stack>
        {/* <AssociateZeroTree />
        <br />
        <YesterdayLoggedIn />
        <br />
        <br />
        <br />
        <Container>
          <Card style={{ padding: '20px', background: 'none', boxShadow: 'none' }}>
            <Grid container spacing={3} style={{ marginBottom: '70px'}}>
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
              <img src={Quotes} alt="img" height="30px" width='30px'/>
               <i>
               It is not so much for its beauty that the forest makes a claim upon men’s hearts, as for that subtle
                something,that quality of air that emanation from old trees,that so wonderfully changes and renews
                aweary spirit.
               </i>
              </Grid>
            </Grid>
            <img src={TreeBottom} alt="img" height="70px" width='200px' style={{position: 'absolute', bottom: '0', right: '0'}} />
            
          </Card>
        </Container> */}
      </Container>
   
    </Page>
  );
}
