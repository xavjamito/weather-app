import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchForecast, selectForecast } from '../../slices/forecastSlice';
import WeatherCard from '../WeatherCard/WeatherCard';
import { Spinner } from '../shared/Spinner';
import { selectCity } from '../../slices/citySlice';

interface Weather {
  dt: number; 
  main: {
    temp: number; 
  };
  weather: [{
    main: string; 
    description: string; 
  }];
}

const Forecast: React.FC = () => {
  const city = useAppSelector(selectCity); 
  const forecast = useAppSelector(selectForecast);
  const dispatch = useAppDispatch();
  const capitalizedCity = city[0].toUpperCase() + city.slice(1)
  const error = useAppSelector((state) => state.forecast.error);

  useEffect(() => {
    if (city) dispatch(fetchForecast(city)); 
  }, [city, dispatch]);

  if (error) {
    return <div className="text-center text-red-500">Error: Could not find City. Please try again.</div>;
  }

  if (!forecast || forecast.list.length === 0) return <Spinner />;

  return (
    <div className="m-5">
      <h2 className="text-2xl text-center font-bold my-4">5-Day Forecast for {capitalizedCity}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {forecast.list.filter((_: Weather, index: number) => index % 8 === 0).map((weather: Weather, index: number) => (
        <WeatherCard key={index} weather={weather} />
      ))}
      </div>
    </div>
  );
};

export default Forecast;
