import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentWeather, selectCurrentWeather } from '../../slices/currentWeatherSlice';
import { Spinner } from '../shared/Spinner';

const CurrentWeather: React.FC = () => {
  const currentWeather = useAppSelector(selectCurrentWeather);
  const error = useAppSelector((state) => state.currentWeather.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather('New York'));
  }, [dispatch]);

  if (!currentWeather) return <Spinner />;

  if (error) {
    return <div className="text-center text-red-500">Error: Could not find City. Please try again.</div>;
  }

  return (
    <div className="card bg-base-100 shadow-xl m-5">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">Current Weather in {currentWeather.name}</h2>
        <p className="text-xl">Temperature: {currentWeather.main.temp}°C</p>
        <p className="text-lg">Conditions: {currentWeather.weather[0].description}</p>
        <div className="card-actions justify-end">
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p>Wind: {currentWeather.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
