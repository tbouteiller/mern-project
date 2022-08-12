import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ workout, exercise }) => {
  let data = {
    labels: exercise.set.map(
      (set, index) => `Set ${index + 1} (${set.reps} reps)`
    ),
    datasets: [
      {
        label: "Weight (lbs)",
        data: exercise.set.map((set, index) => set.weight),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  let options = {
    maintainAspectRation: true,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 300,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} height={150} />
    </div>
  );
};

export default BarChart;
