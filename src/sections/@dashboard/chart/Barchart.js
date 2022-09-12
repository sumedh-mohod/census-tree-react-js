// import React from 'react'
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import {
//     Button,
//   } from '@mui/material';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Barchart = () => {
//     const options = {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           title: {
//             display: true,
//             text: 'Chart.js Bar Chart',
//           },
//         },
//       };
    
//       const data = {
//         labels: ['jan', 'feb', 'mar', 'apr','may', 'jun', 'july','aug', 'sep', 'oct', 'nov', 'dec'],
//         datasets: [
//           {
//             label: 'Dataset 1',
//             data: [10000, 20000, 30000, 90000, 110000, 150000, 10000, 150000, 10000, 20000, 50000, 40000],
//             backgroundColor: "rgba(54, 162, 235, 0.2)",
//           },
//         ],
//       };
      
//   return (
//    <>
//     <Bar options={options} data={data} />
  
//    </>
//   )
// }

// export default Barchart