import React, { useState } from 'react';
import { fetchCurrentWeather } from '../../slices/currentWeatherSlice';
import { setCity } from '../../slices/citySlice';
import { useAppDispatch } from '../../hooks';

const SearchBar: React.FC = () => {
  const [city, setCityState] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(fetchCurrentWeather(city));
    dispatch(setCity(city));
  };

  return (
    <div className="form-control w-full max-w-xs mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Enter city..."
          className="input input-bordered input-primary w-full"
          value={city}
          onChange={(e) => setCityState(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ml-2" disabled={city.length === 0}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
