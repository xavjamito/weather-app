import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import weatherService from '../api/weatherService';

interface CurrentWeatherState {
  data: any;
  error: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CurrentWeatherState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchCurrentWeather = createAsyncThunk(
  'currentWeather/fetchCurrentWeather',
  async (city: string) => {
    const response = await weatherService.getCurrentWeather(city);
    return response;
  }
);

export const currentWeatherSlice = createSlice({
  name: 'currentWeather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectCurrentWeather = (state: RootState) => state.currentWeather.data;
export const selectStatus = (state: RootState) => state.currentWeather.status;

export default currentWeatherSlice.reducer;
