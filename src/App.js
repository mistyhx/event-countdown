import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import DateTimeSelection from "./components/DateTimeSelection";

function App() {
  const [datetime, setDateTime] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const handleSubmit = () => {
    const then = moment(datetime);
    const now = moment();
    const countdown = moment(then - now);
    const days = countdown.format("D");
    const hours = countdown.format("HH");
    const minutes = countdown.format("mm");
    setDay(days);
    setHour(hours);
    setMinute(minutes);
  };

  return (
    <div className="App">
      <button>Change Event</button>
      {/*calculate the difference on submit */}
      <DateTimeSelection
        datetime={datetime}
        onChange={datetime => setDateTime(datetime)}
        onSubmit={() => handleSubmit()}
      />
      <div className="count-down">
        <div className="day">{day}</div>
        <div className="hours">{hour}</div>
        <div className="minutes">{minute}</div>
      </div>
    </div>
  );
}

export default App;
