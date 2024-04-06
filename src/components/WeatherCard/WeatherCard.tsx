import React from 'react';

interface Weather {
  dt: number; 
  main: {
    temp: number; 
  };
  weather: [{
    main: string; 
    description: string; 
    icon?: string;
  }];
}

interface WeatherCardProps {
  weather: Weather;
}

type WeatherConditionColors = {
  [key: string]: string; 
  Clear: 'bg-blue-200';
  Clouds: 'bg-gray-200';
  Rain: 'bg-gray-400';
  Snow: 'bg-blue-100';
};

const weatherConditionColors: WeatherConditionColors = {
  Clear: 'bg-blue-200',
  Clouds: 'bg-gray-200',
  Rain: 'bg-gray-400',
  Snow: 'bg-blue-100',
};


const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const formattedDate = new Date(weather.dt * 1000).toLocaleDateString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
  });

  const colorClass = weatherConditionColors[weather.weather[0].main] || 'bg-blue-200';

  return (
    <div className={`card shadow-xl hover:shadow-2xl transition duration-300 ease-in-out ${colorClass}`}>
      <div className="card-body p-5 text-center dark:text-gray-200">
        <h3 className="card-title dark:text-white">{formattedDate}</h3>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="Weather Icon" className="mx-auto"/>
        <p className="text-lg font-semibold dark:text-white">Temp: {Math.round(weather.main.temp)}°C</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">{weather.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
