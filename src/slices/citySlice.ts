import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    name: 'New York',
  },
  reducers: {
    setCity: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;

export const selectCity = (state: { city: { name: any; }; }) => state.city.name;

export default citySlice.reducer;
