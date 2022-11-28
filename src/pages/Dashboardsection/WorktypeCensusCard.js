import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectImg from '../../Assets/project_ongoing.png';
//   import Iconify from '../../../components/Iconify';

const WorktypeCensusCard = (props) => {
  // console.log("propscensus", props);
  const difference = props?.value[2]?.count - props?.value[1]?.count;
  const ereDifference = props?.value[1]?.count - props?.value[2]?.count;
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
      color: '#AB515D',
    },
    greenButton: {
      fontSize: '12px',
      border: '2px solid #3F7D7A',
      borderRadius: '5px',
      padding: '5px 10px',
      background: '#C8FADE',
      color: '#3F7D7A',
    },
    equalButton: {
      fontSize: '12px',
      border: '2px solid #bf9303',
      borderRadius: '5px',
      padding: '5px 10px',
      background: '#FFE899',
      color: '#bf9303',
    },
    more: {
      color: '#214C50',
    },
    less: {
      color: '#AB515D',
    },
    equal: {
      color: '#bf9303',
    },
    movingIconmore: {
      color: '#334C50',
      background: '#C8FADE',
      padding: '5px',
      borderRadius: '20px',
    },
    movingIconless: {
      color: '#AB515D',
      background: '#F6D2D8',
      padding: '5px',
      borderRadius: '20px',
    },
    movingIconequal: {
      color: '#bf9303',
      background: '#FFE899',
      padding: '5px',
      borderRadius: '20px',
    },
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
              <Grid container item xs={5}>
                <Typography variant="h5" style={{ color: '#2D653F', paddingLeft: '10px' }} ml={2} mt={1}>
                  <b>{props?.value[0]?.count}</b>
                </Typography>
              </Grid>
              <Grid container item xs={7}>
                <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={0.7} mb={0.7}>
                  {props?.value[0]?.day}
                  <Typography variant="h6">{props?.value[0]?.date}</Typography>
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
                  <b className={difference === 0 ? classes.equalButton : difference > 0 ? classes.redButton: classes.greenButton}>{props?.value[1]?.count}</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                    {props?.value[1]?.day}
                    <Typography variant="h5" style={{ color: '#000', fontSize: '15px' }}>
                      {props?.value[1]?.date}
                    </Typography>
                  </Typography>
                </Typography>
              </Grid>
              <Grid container item xs={6}>
                <Typography variant="h5" style={{ color: '#3F7D7A', padding: '7px 25px' }}>
                  <b className={ereDifference === 0 ? classes.equalButton : ereDifference > 0 ? classes.redButton: classes.greenButton}>{props?.value[2]?.count}</b>
                  <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }} mt={1}>
                    {props?.value[2]?.day}
                    <Typography variant="h5" style={{ color: '#000', fontSize: '15px' }}>
                      {props?.value[2]?.date}
                    </Typography>
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <div className={classes.border} />
            <Grid container spacing={1} mt={0.7} mb={0.5}>
              <Grid container item xs={10}>
                <Typography variant="h6" style={{ fontWeight: 400, paddingLeft: '10px' }} ml={2}>
                  Yesterday count is{' '}
                  <b className={difference === 0 ? classes.equal : difference > 0 ? classes.less : classes.more}>
                    {difference === 0 ? '' : difference > 0 ? Math.abs(difference) : Math.abs(difference)}{' '}
                    {difference === 0 ? 'equal' : difference > 0 ? 'Less' : 'More'}
                  </b>{' '}
                  {difference === 0 ? 'to' : difference > 0 ? 'than' : 'than'} ereyesterday count
                </Typography>
              </Grid>
              <Grid container item xs={2}>
                <Typography variant="h6" style={{ color: '#000', fontWeight: 400 }}>
                  {difference === 0 ? (
                    <HorizontalRuleIcon className={classes.movingIconequal} />
                  ) : difference > 0 ? (
                    <TrendingDownIcon className={classes.movingIconless} />
                  ) : (
                    <TrendingUpIcon className={classes.movingIconmore} />
                  )}
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
