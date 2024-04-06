import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchHistoricalData, selectHistoricalData } from '../../slices/historicalDataSlice';
import { Spinner } from '../shared/Spinner';

interface HistoricalDataProps {
  city: string; 
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ city }) => {
  const historicalData = useAppSelector(selectHistoricalData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHistoricalData({ city: city }));
  }, [dispatch, city]);
  
  if (!historicalData || historicalData.length < 1) {
    return <Spinner />;
  }
  console.log('historical data!!!', historicalData)

  return (
    <div className="m-5">
      <h2 className="text-2xl text-center font-bold mb-4">Historical Weather Data</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Max Temp (°C)</th>
              <th>Min Temp (°C)</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {historicalData.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.temperature.max}</td>
                <td>{data.temperature.min}</td>
                <td>{data.weatherCondition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalData;
