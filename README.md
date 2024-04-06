# Weather Dashboard Application

Welcome to the Weather Dashboard application! This application provides current weather conditions, a 5-day forecast, and historical weather data for any city searched by the user.

## Features

- Search for weather information by city name.
- View current weather conditions.
- Get a 5-day weather forecast.
- Access historical weather data for the searched location.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software:

- [Node.js](https://nodejs.org/)
- An API Key from [OpenWeatherMap](https://openweathermap.org/api)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  Clone the repository to your local machine.
    `git clone https://github.com/xavjamito/weather-app`
2.  Navigate to the cloned repo.
    `cd weather-app`

3.  Install dependencies
    `npm install`
4.  Set up your environment variables by creating a `.env` file in the root directory and adding your OpenWeatherMap API key:
    `REACT_APP_OPEN_WEATHER_API_KEY=your_api_key_here`

### Obtaining the OpenWeatherMap API Key

To use the OpenWeatherMap API, you'll need to sign up and obtain an API key:

1.  Go to [OpenWeatherMap](https://openweathermap.org/).
2.  Sign up for an account.
3.  After signing up, go to the API keys tab on your account page.
4.  Click on the 'Create Key' button to generate a new API key.
5.  Copy the generated API key and paste it into your `.env` file as shown above.

Remember that it may take a maximum of two hours for the new API key to become active.

### Running the Application

With the API key set, start the application by running:
`npm start`

## Usage

Simply enter the name of the city for which you wish to check the weather in the search bar. The current weather, forecast, and historical data will be displayed on the screen.

## Built With

- [React](https://reactjs.org/) - The web framework used.
- [Tailwind CSS](https://tailwindcss.com/) - For styling.
- [DaisyUI](https://daisyui.com/) - UI component library.
- [OpenWeatherMap API](https://openweathermap.org/api) - Source of the weather data.
