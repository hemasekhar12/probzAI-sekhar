import React from 'react';
import ChartComponent from './components/ChartComponent';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Timeframe Chart</h1>
      <ChartComponent />
    </div>
  );
};

export default App;
