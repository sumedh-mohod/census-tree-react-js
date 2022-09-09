import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    Button,
  } from '@mui/material';
import { ConnectingAirportsOutlined } from '@mui/icons-material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ByTreeNameGraph = (props) => {
  const {data: graph} = props;
    // console.log('data_', graph);
    const length = graph.length;
    const x = [];
    const y = [];
    
    for(let i=0;i<length;i+=1){
      
        x.push(graph[i].name)
     
    }

    for(let i=0;i<length;i+=1){
      y.push(graph[i].census_trees_count)
    }
    // console.log(x)
    // console.log(y)
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
            label: 'Tree Name',
            data: y,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
        ],
      };
      
  return (
   <>
    <Bar options={options} data={data} />
  
   </>
  )
}

export default ByTreeNameGraph