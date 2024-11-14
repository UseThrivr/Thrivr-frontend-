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
  labels: string[]; // Months or other x-axis labels
  dataPoints: number[]; // Data points for each month
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
      tooltip: {
        backgroundColor: '#870E73',
        titleFont: {
          size: 14
        },
        callbacks: {
          title: (context: { formattedValue: string }[]) => {
            return `${context[0].formattedValue} million`;
          },          label: (context: { label: string }) => {
            return context.label;
          }        },
        intersect: false,
        mode: 'index',
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 100,
          font: {
            size: 8
          }
        },
        grid: {
          drawOnChartArea: false,
          color: 'rgba(0,0,0,0.1)',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 8
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    }
  };

  return <Bar data={data} options={options} className="h-[401px] mt-[3rem]" />;
};

export default BarChart;
