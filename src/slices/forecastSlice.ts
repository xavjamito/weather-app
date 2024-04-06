import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import weatherService from '../api/weatherService';

interface ForecastState {
  data: any;
  error: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ForecastState = {
  data: null,
  error: null,
  status: 'idle',
};

export const fetchForecast = createAsyncThunk(
  'forecast/fetchForecast',
  async (city: string) => {
    const response = await weatherService.getForecast(city);
    return response;
  }
);

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'idle';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectForecast = (state: RootState) => state.forecast.data;
export const selectForecastStatus = (state: RootState) => state.forecast.status;

export default forecastSlice.reducer;
