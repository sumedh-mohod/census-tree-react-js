import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectImg from '../../Assets/project_ongoing.png';
//   import Iconify from '../../../components/Iconify';

const UsersCard = () => {
  //   const { count, title, subtitle } = props.value;
  const useStyles = makeStyles({
    common: {
      padding: '5px 5px 5px 5px',
      background: '#F0F6EE',
      border: '1px solid #d1cfcf',
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
      color: '#eb8239',
    },
    cardCountComplete: {
      padding: '5px 5px 5px 5px',
      color: '#214C50',
    },
    border: {
      borderBottom: '2px solid #d1cfcf',
    },
    borderRight: {
      borderRight: '2px solid #d1cfcf',
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card style={{ height: '160px' }} className={classes.common}>
            <Typography variant="h4" className={classes.cardCount}>
              10897
              <Typography variant="h6" style={{ color: '#214C50' }}>
                Base Color User
              </Typography>
            </Typography>
            <ArrowCircleRightIcon
              style={{ position: 'absolute', top: '15', right: '15', height: '30px', width: '30px', color: '#214c50' }}
            />
            <div className={classes.border} />
            <Grid container spacing={1} mt={0.2}>
              <Grid container item xs={6}>
                <Typography
                  variant="h5"
                  style={{ color: '#5d935d', paddingLeft: '10px' }}
                  className={classes.borderRight}
                >
                  <b>10,200</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }}>
                    Base Color Onsite QC
                  </Typography>
                </Typography>
              </Grid>
              <Grid container item xs={6}>
                <Typography variant="h5" style={{ color: 'red', paddingLeft: '10px' }}>
                  <b> 600</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }}>
                    Base Color Offsite QC
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UsersCard;
