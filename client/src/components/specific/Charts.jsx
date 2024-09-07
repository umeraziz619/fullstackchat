import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import {getLast7Days} from '../../lib/features'
ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const labels = getLast7Days();

const lienChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};
const LineChart = ({ value = [] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,1)",
        fill: true,
      },
    ],
  };
  return <Line data={data} options={lienChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout:120,
};
const DoughnutChart = ({value=[],labels=[]}) => {
    const data = {
        labels: labels,
        datasets: [
          {
            data: value,
            label: "Total Chats vs Group Chats",
            backgroundColor: ["purple",'orange'],
            borderColor: ['purple','orange'],
            offset:20,
          },
        ],
      };
  return <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>
};

export { LineChart, DoughnutChart };
