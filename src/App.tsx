import React, { useState } from 'react';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import Forecast from './components/Forecast/Forecast';
import HistoricalData from './components/HistoricalData/HistoricalData';
import SearchBar from './components/SearchBar/SearchBar';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="App">
      <Navbar />
    <div className="container mx-auto p-4">
      <SearchBar />
      <CurrentWeather />
      <div role="tablist" className="tabs tabs-boxed flex justify-center gap-4 my-4">
        <button className={`tab ${((activeTab === 'forecast') || (activeTab === 'current')) ? 'tab-active' : ''}`} onClick={() => setActiveTab('forecast')}>5-Day Forecast</button>
        <button className={`tab ${activeTab === 'historical' ? 'tab-active' : ''}`} onClick={() => setActiveTab('historical')}>Historical Data</button>
      </div>
      {((activeTab === 'forecast') || (activeTab === 'current')) && <Forecast />}
      {activeTab === 'historical' && <HistoricalData city='singapore' />}
    </div>
  </div>
  );
};

export default App;
