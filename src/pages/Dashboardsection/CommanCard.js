import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import ProjectImg from '../../Assets/project_ongoing.png';
//   import Iconify from '../../../components/Iconify';

const CommanCard = (props) => {
  console.log('props',props);
  const values = props.value;
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
      borderBottom: '1px solid #EEEEEE',
      color: '#DF6526 !important'
    },
    cardCountComplete: {
        padding: '5px 5px 5px 5px',
        borderBottom: '1px solid #EEEEEE',
        color: '#214C50'
      },
  });
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {values.map((val,index)=>{
            return (
                <Grid item xs={12}>
                <Card>
                  <div className={classes.wrapper}>
                    <div>
                      <h2 className={val.title === 'Ongoing Projects' ? classes.cardCount: classes.cardCountComplete}>
                        {val.count}
                      </h2>
                      <Typography className={classes.cardleftSection}>
                        {val.title}
                        <Typography variant="h6" sx={{ opacity: 0.72, fontWeight: 400}} >
                          {val.subtitle}
                        </Typography>
                      </Typography>
                    </div>
                    {/* <div>
                      <img src={ProjectImg} alt="project" style={{marginTop: '10px'}}/>
                    </div> */}
                  </div>
                </Card>
              </Grid>
            )
        })}
      
      </Grid>
    </Grid>
  );
};

export default CommanCard;
