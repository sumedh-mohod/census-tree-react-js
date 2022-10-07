import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectImg from '../../Assets/project_ongoing.png';
//   import Iconify from '../../../components/Iconify';

const LightCard = (props) => {
  // console.log('props',props);
  const { count, title, subtitle } = props.projects;
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
      borderBottom: '1px solid #EEEEEE'
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card>
            <div className={classes.wrapper}>
              <div>
                <h2 className={classes.cardCount}>
                  {count}
                </h2>
                <Typography className={classes.cardleftSection}>
                  {title}
                  <Typography variant="h6" sx={{  fontWeight: 500 }}>
                    {subtitle}
                  </Typography>
                </Typography>
              </div>
              <div>
                <img src={ProjectImg} alt="project" style={{marginTop: '10px'}}/>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LightCard;
