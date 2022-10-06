import { useState , useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
// sections
import { LoginForm } from '../sections/auth/login';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    marginBottom: 0,
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 650,
  display: 'flex',
  // height: 657,
  flexDirection: 'column',
  justifyContent: 'center',
  // margin: theme.spacing(2, 0, 2, 2),
  backgroundImage: `url(${'/static/illustrations/Background.png'})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  borderRadius: '0%',
  color: '#fff',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  // minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [windowSize, setWindowSize] = useState(getWindowSize());


  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  // console.log('windowSize.innerHeight',windowSize.innerHeight);
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const useStyles = makeStyles({
    item: {
      // backgroundImage: `url(${"/static/illustrations/TopPlant.png"})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      backgroundColor: '#fff'
    },
    item1: {
      height: windowSize.innerHeight + 20
    },
    font: {
      fontWeight: 400,
      fontSize: 16,
      marginBottom: 20,
    },
    bottom: {
      position: 'absolute',
      bottom: 10,
    },
  });
  const classes = useStyles();
  return (
    <Page title="Login" >
      <RootStyle >
         <img src="/static/illustrations/TopPlant.png" height='200' style={{ position: 'absolute',right:'0',top: '0'}} width='200'  alt="login" />
    
        {/* <HeaderStyle>
         
        </HeaderStyle> */}

        {mdUp && (
          <SectionStyle sx={{ px: 5,}} className={classes.item1}>
            <Typography style={{ top: '40px', position: 'absolute', height: '50px' }}>
              <Logo />
            </Typography>
            <Typography variant="h1" sx={{ mb: 0, mt: 1 }}>
              tree
            </Typography>
            <Typography variant="h2" sx={{ mt: -4 }} style={{color: '#ccd576'}}>
              census
            </Typography>
            <Typography className={classes.font}>
              Welcome to the <b>Tree  Census</b><br />
             Web Portal
            </Typography>
            <Typography className={classes.bottom}>
              <img src="/static/illustrations/Quote.png" height="70" width="70" alt="login" />
              <Typography className={classes.font}>
                <i>The true meaning of life is to plant trees, under whose shade you do not expect to sit</i>
              </Typography>
            </Typography>
          </SectionStyle>
        )}


        <Container className={classes.item}>
          <ContentStyle maxWidth="sm" style={{padding: '180px 0px'}}>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
