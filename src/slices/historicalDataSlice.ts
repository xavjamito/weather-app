import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import axios from 'axios';

interface CityCoordinates {
  lat: number;
  lon: number;
}

interface HistoricalWeather {
  date: string;
  temperature: {
    max: number;
    min: number;
  };
  weatherCondition: string;
}


interface HistoricalDataState {
  data: HistoricalWeather[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: HistoricalDataState = {
  data: [],
  status: 'idle',
  error: null,
};

async function fetchCityCoordinates(city: string, stateCode: string = '', countryCode: string = ''): Promise<CityCoordinates> {
  const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/geo/1.0/direct`;

  try {
    const response = await axios.get(url, {
      params: {
        q: `${city},${stateCode},${countryCode}`,
        limit: 1,
        appid: API_KEY,
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    } else {
      throw new Error('Location not found.');
    }
  } catch (error) {
    throw new Error('Failed to fetch city coordinates.');
  }
}

export const fetchHistoricalData = createAsyncThunk(
  'historicalData/fetchHistoricalData',
  async ({city, stateCode = '', countryCode = ''}: {city: string, stateCode?: string, countryCode?: string}, { rejectWithValue }) => {
    try {
      const { lat, lon } = await fetchCityCoordinates(city, stateCode, countryCode);

      console.log('city coordinates!!!', lat, lon)

      const start = Math.floor(Date.now() / 1000) - 86400 * 30;
      const end = Math.floor(Date.now() / 1000);
      const historicalDataURL = `https://history.openweathermap.org/data/1.0/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;

      const response = await axios.get(historicalDataURL);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('An unknown error occurred while fetching historical data.');
    }
  }
);

export const historicalDataSlice = createSlice({
  name: 'historicalData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action: PayloadAction<HistoricalWeather[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectHistoricalData = (state: RootState) => state.historicalData.data;
export const selectHistoricalDataStatus = (state: RootState) => state.historicalData.status;
export const selectHistoricalDataError = (state: RootState) => state.historicalData.error;

export default historicalDataSlice.reducer;
