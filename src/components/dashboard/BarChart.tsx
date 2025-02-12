import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
  labels?: string[]; // Months or other x-axis labels
  dataPoints?: number[]; // Data points for each month
}

const BarChart: React.FC<BarChartProps> = ({ labels, dataPoints }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: dataPoints,
        backgroundColor: 'rgba(253, 197, 244, 1)',
        borderColor: 'rgba(253, 197, 244, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Monthly Points',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100, // Customize steps as per your requirement
        },
        grid: {
          drawOnChartArea: false, // This will show grid dots instead of lines
          color: 'rgba(0,0,0,0.1)', // Dotted color (faint gray)
        },
      },
      x: {
        grid: {
          display: false, // No grid lines for x-axis
        },
      },
    },
  };

  return <Bar data={data} options={options} className="h-[401px] mt-[3rem]" />;
};

export default BarChart;
