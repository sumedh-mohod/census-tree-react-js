import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Container } from '@material-ui/core';
//   import Iconify from '../../../components/Iconify';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CensusTreeGraph = (props) => {
  const action = Object.keys(props?.value);
  const count = Object.values(props?.value);
    const length = action.length - 1;
    const x = [];
    const y = [];
    
    for(let i=0;i<length;i+=1){
      
        x.push(action[i])
     
    }

    for(let i=0;i<length;i+=1){
      y.push(count[i])
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            // text: 'Chart.js Bar Chart',
          },
        },
      };
    
      const data = {
        labels: x,
        datasets: [
          {
            label: 'Census Trees',
            data: y,
            backgroundColor: "#b0c458",
            borderRadius: 15
          },
        ],
      };
      
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
          <Card className={classes.common} style={{height: "270px"}}>
          <Container>
          <Bar options={options} data={data} />
          </Container>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CensusTreeGraph;
