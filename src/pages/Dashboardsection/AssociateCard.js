import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import Associates from '../../Assets/associates.png';
//   import Iconify from '../../../components/Iconify';

const AssociateCard = (props) => {
  console.log('props', props);
  const { count, subtitle, title, color } = props.value;
  //   const { count, title, subtitle } = props.value;
  const useStyles = makeStyles({
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
      padding: '5px 5px 5px 5px',
      // borderBottom: '1px solid #EEEEEE',
      color: '#6C986C'
    },
    cardCountComplete: {
      padding: '5px 5px 5px 5px',
      color: '#214C50',
    },
    border: {
      borderBottom: '2px solid #EEEEEE',
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card style={{ height: '160px' }}>
            <div className={classes.wrapper}>
              <div>
                <Typography variant="h4" className={classes.cardCount}>
                  23900
                </Typography>
                <ArrowCircleRightIcon
                  style={{
                    position: 'absolute',
                    top: '15',
                    right: '15',
                    height: '30px',
                    width: '30px',
                    color: '#214c50',
                  }}
                />
                <div className={classes.border} />
                <Typography className={classes.cardleftSection}>
                  Associates
                  <Typography variant="h6" sx={{ fontWeight: 400 }}>
                    It is showing all associates counts <br />
                    and details of it.
                  </Typography>
                </Typography>
              </div>
              <div >
                <img src={Associates} alt="project" height="180px" style={{position: 'absolute', right: 20, bottom: 0}} />
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AssociateCard;
