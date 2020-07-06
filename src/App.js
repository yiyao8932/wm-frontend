import React from 'react';
import './App.css';
import NavBar from './UI/NavBar/NavBar';
import ClockInClockOut from './components/ClockInClockOut/ClockInClockOut';

function App() {
  return (
    <div className="App">
      <NavBar />
      <ClockInClockOut />
    </div>
  );
}

export default App;
