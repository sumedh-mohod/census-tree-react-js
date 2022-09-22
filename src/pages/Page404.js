import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="404 Page Not Found" sx={{ background: '#214c50' }}>
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          
          <Box
            component="img"
            src="/static/illustrations/404 Image.png"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          <Typography sx={{ mt: -10, fontWeight: 400, color: '#f1f1f1',fontSize: 18 }}>
            <Typography sx={{ fontSize: 24, fontWeight: 800 }}>Page Not Found</Typography>
            Something went wrong man! We cannot found what you are looking for.
          </Typography><br/>
          <Button
            to="/"
            size="large"
            variant="contained"
            style={{background: '#f1f1f1', color: '#214C50' }}
            component={RouterLink}
          >
            Go to Home Page
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
