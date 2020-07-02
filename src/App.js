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
    const then = moment(datetime, "YYYY-MM-DDThh:mm");
    const now = moment();
    const duration = moment.duration(then.diff(now));
    if (duration >= 0) {
      const days = duration.get("days");
      const hours = duration.get("hours");
      const minutes = duration.get("minutes");
      const seconds = duration.get("seconds");
      setDay(days);
      setHour(hours);
      setMinute(minutes);
      setSecond(seconds);
    } else {
      setDay(0);
      setHour(0);
      setMinute(0);
      setSecond(0);
    }
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
      <svg className="top" height="200" width="100%">
        <ellipse cx="50%" cy="-120" rx="550" ry="300" fill="#fff" />
      </svg>

      <svg className="bottom" height="300" width="100%">
        <ellipse cx="50%" cy="420" rx="550" ry="300" fill="#D11A0F" />
      </svg>
      <div className="main">
        <button className="start-button">CREATE EVENT</button>

        <div className="datetime-selector">
          <DateTimeSelection
            datetime={datetime}
            onChange={value => setDateTime(value)}
            onSubmit={() => handleSubmit()}
          />
        </div>

        <div className="event-title">新年倒计时</div>
        <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
      </div>
    </div>
  );
}

export default App;
