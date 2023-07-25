import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

function Forecasting() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('createForecast');
        const forecast = JSON.parse(response.data.forecast);
        console.log(forecast);

        if (forecast) {
          const labels = forecast.map((item) => item.ds);
          const yhatData = forecast.map((item) => item.yhat);
          const yhatLowerData = forecast.map((item) => item.yhat_lower);
          const yhatUpperData = forecast.map((item) => item.yhat_upper);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Predicted Sales',
                data: yhatData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
              },
              {
                label: 'Lower Bound',
                data: yhatLowerData,
                fill: false,
                backgroundColor: 'rgba(77,255,255,0.1)',
                borderColor: 'rgba(153,204,255,1)',
              },
              {
                label: 'Upper Bound',
                data: yhatUpperData,
                fill: '-1',
                backgroundColor: 'rgba(77,255,255,0.1)',
                borderColor: 'rgba(153,204,255,1)',
              },
            ],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error during fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current && chartData.labels) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {},
      });
    }
  }, [chartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
        <div>
            <div className = "table-header">
              <h2 className = "table-heading">Sales Forecasts</h2>
            </div>
            <canvas ref={chartContainer} />
        </div>
  );
}

export default Forecasting;
