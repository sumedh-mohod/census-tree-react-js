import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import MovingIcon from '@mui/icons-material/Moving';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectImg from '../../Assets/project_ongoing.png';
//   import Iconify from '../../../components/Iconify';

const WorktypeCensusCard = (props) => {
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
        background: '#F6D2D8'
    },
    greenButton:{
        fontSize: '12px',
    border: '2px solid #3F7D7A',
    borderRadius: '5px',
    padding: '5px 10px',
    background: '#C8FADE'
    }
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card className={classes.common}>
            <Typography variant="h4" className={classes.cardCount} ml={1}>
              {props?.census}
              <Typography variant="h6" style={{ fontWeight: 400 }}>
                Below It will show count details
              </Typography>
            </Typography>

            <div className={classes.border} />
            <Grid container spacing={1}>
              <Grid container item xs={5} >
                <Typography variant="h5" style={{ color: '#2D653F', paddingLeft: '10px' }} ml={2} mt={1}>
                  <b>1020</b>
                </Typography>
              </Grid>
              <Grid container item xs={7}>
                <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={0.7} mb={0.7}>
                Yesterday
                  <Typography variant="h6">21 Jan 2020</Typography>
                </Typography>
              </Grid>
            </Grid>

            <div className={classes.border} />
            <Grid container spacing={1} mt={0}>
              <Grid container item xs={6}>
                <Typography
                  variant="h5"
                  style={{ color: '#AB515D', padding: '7px 25px' }}
                  className={classes.borderRight}
                >
                  <b className={classes.redButton}>10,200</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                    Yesterday
                    <Typography variant="h5" style={{ color: '#000', fontSize: '15px' }}>
                      21 Jan 2020
                    </Typography>
                  </Typography>
                </Typography>
              </Grid>
              <Grid container item xs={6}>
                <Typography variant="h5" style={{ color: '#3F7D7A', padding: '7px 25px' }}>
                  <b className={classes.greenButton}>10,200</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                    Ereyesterday
                    <Typography variant="h5" style={{ color: '#000', fontSize: '15px' }}>
                      20 Jan 2020
                    </Typography>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.border} />
            <Grid container spacing={1} mt={0.7} mb={0.5}>
              <Grid container item xs={10}>
                <Typography variant="h6" style={{ fontWeight: 400, paddingLeft: '10px' }} ml={2} >
                  Yesterday count is <b style={{color: '#334C50'}}>2,200 more</b> than ereyesterday count
                </Typography>
              </Grid>
              <Grid container item xs={2}>
                <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }}>
                
                  <MovingIcon style={{color: '#334C50', background: '#C8FADE', padding: '5px', borderRadius: '20px'}}/>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WorktypeCensusCard;
