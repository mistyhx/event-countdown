import React, { useState, useEffect } from "react";
import "./App.css";
import DateTimeSelection from "./components/DateTimeSelection";

function App() {
  const [day, setDay] = useState(365);
  const [hour, setHour] = useState(28);
  const [minute, setMinute] = useState(20);

  return (
    <div className="App">
      <button>Change Event</button>
      <DateTimeSelection />
      <div className="count-down">
        <div className="day">{day}</div>
        <div className="hours">{hour}</div>
        <div className="minutes">{minute}</div>
      </div>
    </div>
  );
}

export default App;
