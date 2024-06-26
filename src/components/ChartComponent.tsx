import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { fetchData } from '../services/dataService';

interface DataPoint {
  timestamp: string;
  value: number;
}

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [options, setOptions] = useState<any>({});
  const [series, setSeries] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const chartData = await fetchData();
        console.log("Fetched Data:", chartData); // Log data to console

        setData(chartData);

        setOptions({
          chart: {
            type: 'line',
            zoom: { enabled: true },
            events: {
              click: (event: any, chartContext: any, config: any) => {
                const dataPointIndex = config.dataPointIndex;
                if (dataPointIndex !== -1) {
                  const pointData = chartData[dataPointIndex];
                  alert(`Timestamp: ${pointData.timestamp}\nValue: ${pointData.value}`);
                }
              }
            }
          },
          xaxis: {
            type: 'datetime',
            categories: chartData.map((d: DataPoint) => d.timestamp)
          },
          yaxis: {
            title: { text: 'Value' }
          }
        });

        setSeries([{ name: 'Values', data: chartData.map((d: DataPoint) => d.value) }]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default ChartComponent;
