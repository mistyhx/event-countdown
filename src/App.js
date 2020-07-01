import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import DateTimeSelection from "./components/DateTimeSelection";

function App() {
  const [datetime, setDateTime] = useState("");
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const updateCountDown = () => {
    const then = moment(datetime);
    const now = moment();
    const countdown = moment(then - now);
    //this calculation result is problematic;
    const days = countdown.format("D");
    const hours = countdown.format("HH");
    const minutes = countdown.format("mm");
    const seconds = countdown.format("ss");
    setDay(days);
    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);
  };

  const handleSubmit = () => {
    updateCountDown();
  };

  useEffect(() => {
    setInterval(() => {}, 1000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <button>Change Event</button>
      <DateTimeSelection
        datetime={datetime}
        onChange={datetime => setDateTime(datetime)}
        onSubmit={() => handleSubmit()}
      />
      <div className="count-down">
        <div className="day">{day}</div>
        <div className="hours">{hour}</div>
        <div className="minutes">{minute}</div>
        <div className="seconds">{second}</div>
      </div>
    </div>
  );
}

export default App;
