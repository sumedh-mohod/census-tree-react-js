
import { makeStyles } from '@material-ui/core/styles';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid, Card } from '@mui/material';
import { Container } from '@material-ui/core';

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: [props?.value?.total_base_color],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19],
//       backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
//       borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
//       borderWidth: 1,
//     },
//   ],
// };
export function AllTreesGraph(props) {
    const data = {
        labels: ["Base Color", "Census"],
        datasets: [
          {
            label: '# of Votes',
            data: [props?.value?.total_base_color, props?.value?.total_census],
            backgroundColor: ['#c8fade', '#214c50'],
            borderColor: ['#c8fade', '#214c50'],
            borderWidth: 1,
          },
        ],
      };
// console.log("AllTreesGraph....", props?.value);
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
              <Pie data={data} />
            </Container>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
