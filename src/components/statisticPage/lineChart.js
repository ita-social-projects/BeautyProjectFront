import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ chartLabels, chartData }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Number of Orders",
        data: chartData,
        borderColor: "rgb(141, 51, 172)",
        backgroundColor: "rgba(141, 51, 172, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: 400 }}>
      <Line options={options} data={data} />
    </div>
  );
}
