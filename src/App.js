import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import DateTimeSelection from "./components/DateTimeSelection";
import CountDownBoard from "./components/CountDownBoard";

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
    setInterval(() => {
      if (datetime) {
        updateCountDown();
      }
    }, 1000);
    // return () => clearInterval(interval);
  }, [datetime]);

  return (
    <div className="App">
      <button className="start-button">START</button>
      <div className="datetime-selector">
        <DateTimeSelection datetime={datetime} onChange={value => setDateTime(value)} onSubmit={() => handleSubmit()} />
      </div>
      <div className="event-title">新年倒计时</div>
      <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
    </div>
  );
}

export default App;
