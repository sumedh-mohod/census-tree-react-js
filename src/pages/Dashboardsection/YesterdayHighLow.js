import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, Container } from '@mui/material';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
//   import Iconify from '../../../components/Iconify';

const YesterdayBaseColor = (props) => {
  const { slug } = props;
  console.log('props', props);
  //   const { count, title, subtitle } = props.value;
  const useStyles = makeStyles({
    common: {
      padding: '5px 5px 5px 5px',
      border: '2px solid #d1cfcf',
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      padding: '10px 15px',
    },
    cardleftSection: {
      padding: '5px 20px 15px 7px',
      fontWeight: 600,
    },
    cardCount: {
      padding: '5px 5px 5px 15px',
      // borderBottom: '1px solid #EEEEEE',
    },
    cardCountComplete: {
      padding: '5px 5px 5px 5px',
      color: '#214C50',
    },
    border: {
      borderBottom: '2px solid #EEEEEE',
    },
    borderRight: {
      borderRight: '2px solid #EEEEEE',
    },
    redButton: {
      fontSize: '12px',
      border: '2px solid #AB515D',
      borderRadius: '5px',
      padding: '5px 10px',
      background: '#F6D2D8',
    },
    greenButton: {
      fontSize: '12px',
      border: '2px solid #3F7D7A',
      borderRadius: '5px',
      padding: '5px 10px',
      background: '#C8FADE',
    },
    successDark: {
      backgroundColor: '#F5FDF9',
      borderRadius: '5px',
      padding: '3px 5px',
      color: '#214C50',
      border: '1.5px solid #214C50',
      fontFamily: 'Poppins',
      // width: '100%',
      fontWeight: 600,
      fontSize: '10px',
      marginTop: '-20px',
    },
    successDark_: {
      backgroundColor: '#DDFAD1',
      borderRadius: '30px',
      padding: ' 10px 14px',
      color: '#507C59',
      border: '2px solid #507C59',
      fontFamily: 'Poppins',
      // width: '100%',
      fontWeight: 600,
      fontSize: '18px',
      // marginTop: '-20px',
      position: 'absolute',
      // top: 0,
      // right: 10,
      marginTop: '-16px',
      overflow: 'visible',
      zIndex: 999999,
    },
    redCard: {
      backgroundColor: '#F6D2D8',
      borderRadius: '30px',
      padding: '10px 14px',
      color: '#AB515D',
      border: '2px solid #AB515D',
      fontFamily: 'Poppins',
      // width: '100%',
      fontWeight: 600,
      fontSize: '18px',
      marginTop: '-16px',
      overflow: 'visible',
      position: 'absolute',
      zIndex: 999999,
    },
    more: {
      color: '#214C50',
       fontWeight: 600
    },
    less: {
      color: '#AB515D',
      fontWeight: 600
    }
    
  });
  const classes = useStyles();
  return (
    <>
     
      <Grid container spacing={1}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          
          <Grid item xs={12}>
          <Typography inline variant="h5" style={{ color: '#2D653F', paddingLeft: '10px',marginRight: '65px' }}  align="right">
        <b className={slug === 'high' ? classes.successDark_ : classes.redCard}>01</b>
      </Typography>
            <Card className={classes.common}>
              <Container>
                <Grid container spacing={1}>
                  <Grid container item xs={12}>
                    <Typography variant="h4" className={slug === 'high'? classes.more : classes.less} mt={2}>
                      9,080
                    </Typography>
                  </Grid>
                  <Grid container  xs={12} mb={1}>
                    <Typography style={{ fontWeight: 400, color: '#000', fontSize: '11px', marginLeft: '10px' }}>
                      <b className={slug === 'high'? classes.more : classes.less}>3400 more</b> than ereyesterday
                    </Typography>
                  </Grid>
                </Grid>
              </Container>

              <div className={classes.border} />
              <Grid container spacing={1}>
                <Grid container item xs={9}>
                  <Typography variant="h5" style={{ color: '#AB515D', padding: '7px 25px 0px 25px' }}>
                    <Typography variant="h5" style={{ color: '#000', fontSize: '15px' }} mt={1} >
                      Akash Thakre
                      <Typography style={{ color: '#000', fontWeight: 400, fontSize: '12px' }}>
                        +91 - 9999999999
                       
                      </Typography>
                    </Typography>
                  </Typography>
                </Grid>
                <Grid container item xs={3}>
                  <Typography variant="h5" style={{ color: '#3F7D7A', padding: '7px 25px' }}>
                    <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={2}>
                      {slug === 'high' ? (
                        <PhoneInTalkIcon
                          style={{
                            color: '#fff',
                            background: '#C75261',
                            borderRadius: '15px',
                            padding: '3px',
                            marginBottom: '-5px',
                            marginLeft: '-20px',
                          }}
                        />
                      ) : (
                        <PhoneInTalkIcon
                          style={{
                            color: '#fff',
                            background: '#214C50',
                            borderRadius: '15px',
                            padding: '3px',
                            marginBottom: '-5px',
                            marginLeft: '-20px',
                          }}
                        />
                      )}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid container  xs={12}>
                <Container>
                <Typography variant="h6" style={{ color: '#000', marginLeft: '10px' }}  mb={1}>
                          <span className={classes.successDark}>MANGO TREE AKOLA</span>
                        </Typography>
                </Container>
                </Grid>
              </Grid>
              <div className={classes.border} />
              <Grid container spacing={1}>
                <Grid container item xs={6}>
                  <Typography variant="h5" style={{ color: '#AB515D', padding: '7px 20px 7px 25px' }}>
                    <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                      Ward
                      <Typography variant="h5" style={{ color: '#000', fontSize: '12px' }}>
                        WARD: 08
                      </Typography>
                    </Typography>
                  </Typography>
                </Grid>
                <Grid container item xs={6}>
                  <Typography variant="h5" style={{ color: '#3F7D7A', padding: '7px 20px 7px 25px' }}>
                    <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                      Zone
                      <Typography variant="h5" style={{ color: '#000', fontSize: '12px' }}>
                        ZONE: 09
                      </Typography>
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default YesterdayBaseColor;
