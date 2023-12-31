import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectAssociate from '../../Assets/project_associates.png';
//   import Iconify from '../../../components/Iconify';

const DarkCard = (props) => {
  // console.log("props",props);
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
      // borderBottom: '1px solid #58adb5',
      color: '#D4E489'
    },
    border: {
      borderBottom: '1px solid #58adb5',
      width: '60%'
    }
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1} >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Card style={{background: '#214C50', height: '160px'}} >
            <div className={classes.wrapper}>
              <div>
                <h2 className={classes.cardCount}>
                  {props?.totalAssociate}
                </h2>
                <div className={classes.border} />
                <Typography className={classes.cardleftSection}>
                 Total Associates
                  <Typography variant="h6" sx={{  fontWeight: 500 }} >
                    It is showing count of <br/>all associates
                  </Typography>
                </Typography>
              </div>
              <div style={{position: 'absolute', right: '0', bottom: '0'}}>
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
