import {Bar, Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleDiagram = () => {

  const data = {
    labels: ['Ми підтримали', 'Ми не підтримали'],
    datasets: [
      {
        label: '# of Votes',
        data: [1238, 310],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ]


  };


  return (
      <Pie data={data}/>
  );
};

export default CircleDiagram;