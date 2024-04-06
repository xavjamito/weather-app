import { configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from '../slices/currentWeatherSlice';
import forecastReducer from '../slices/forecastSlice';
import historicalDataReducer from '../slices/historicalDataSlice';
import cityReducer from '../slices/citySlice';

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherReducer,
    forecast: forecastReducer,
    historicalData: historicalDataReducer,
    city: cityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
