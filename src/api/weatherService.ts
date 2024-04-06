import axios from 'axios';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const weatherService = {
  getCurrentWeather: async (city: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}weather`, {
        params: {
          q: city,
          units: 'metric',
          APPID: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getForecast: async (city: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}forecast`, {
        params: {
          q: city,
          units: 'metric',
          APPID: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default weatherService;
