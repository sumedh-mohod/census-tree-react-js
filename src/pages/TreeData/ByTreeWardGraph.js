

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF as Jspdf } from 'jspdf';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid, Button } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

 
const ByTreeWardGraph=(props)=> {
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
    const customLabel = y.map((val,index)=> `${x[index]}, Count: ${val}`);
  const data = {
    labels: customLabel,
    datasets: [
      {
        label: 'Wards',
        data: y,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(139, 255, 107, 0.2)',
          'rgba(242, 50, 252,0.2)',
          'rgba(0, 249, 216,0.2)'
          
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(139, 255, 107, 1)',
          'rgba(242, 50, 252,1)',
          'rgba(0, 249, 216,1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
    

     
        <Pie data={data} />
  
    </>
  );
}
export default ByTreeWardGraph;