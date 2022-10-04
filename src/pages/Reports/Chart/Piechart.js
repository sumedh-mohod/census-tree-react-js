import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF as Jspdf } from 'jspdf';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid, Button } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export function Piechart() {
  const inputRef = useRef(null);
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new Jspdf();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('download.pdf');
    });
  };
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4} />
        <Grid item xs={8}>
          <Button variant="contained"  onClick={printDocument}>
            Download pie chart
          </Button>
        </Grid>
      </Grid>

      <div ref={inputRef}>
        <Pie data={data} />
      </div>
    </>
  );
}
