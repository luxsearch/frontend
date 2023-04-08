import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import configs from '../../configs';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export const dummyData = {
  labels: ['twitter', 'reddit'],
  datasets: [
    {
      label: 'Tweets/Posts',
      data: [334, 567],
      backgroundColor: [configs.twitterColor, configs.redditColor],
    },
  ],
};

function PieChart({ data }) {
  const newData = {
    labels: ['twitter', 'reddit'],
    datasets: [
      {
        label: 'Tweets/Posts',
        data: [data.tweets, data.posts],
        backgroundColor: [configs.twitterColor, configs.redditColor],
      },
    ],
  };
  return <Pie data={newData} />;
}

export default PieChart;
