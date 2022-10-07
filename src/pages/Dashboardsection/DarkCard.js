import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectAssociate from '../../Assets/project_associates.png';
//   import Iconify from '../../../components/Iconify';

const DarkCard = () => {
  const useStyles = makeStyles({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, auto)',
      padding: '10px 15px',
    },
    cardleftSection: {
      padding: '5px 20px 15px 7px',
      fontWeight: 600,
      color: '#fff'
    },
    cardCount: {
      padding: '5px 5px 5px 5px',
      borderBottom: '1px solid #EEEEEE',
      color: '#D4E489'
    },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card style={{background: '#214C50'}}>
            <div className={classes.wrapper}>
              <div>
                <h2 className={classes.cardCount}>
                  10,234
                </h2>
                <Typography className={classes.cardleftSection}>
                 Total Associates
                  <Typography variant="h6" sx={{  fontWeight: 500 }} >
                    It is showing count of all associates
                  </Typography>
                </Typography>
              </div>
              <div >
                <img src={ProjectAssociate} alt="project" height='130px'/>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DarkCard;
