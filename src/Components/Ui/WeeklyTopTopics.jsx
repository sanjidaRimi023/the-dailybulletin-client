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

export const WeeklyTopTopics = () => {
  const data = {
    labels: ['Politics', 'Tech', 'Health', 'Sports', 'Finance'],
    datasets: [
      {
        label: 'Views',
        data: [450, 390, 320, 280, 210],
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Top Topics by Views',
      },
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Weekly Top Topics</h2>
        <Bar data={data} options={options} />
      </div>
    </section>
  );
};