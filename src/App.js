import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import ConfigModal from "./components/ConfigModal";
import CountDownBoard from "./components/CountDownBoard";

function App() {
  const initialTitle = window.localStorage.getItem("eventTitle") || "";
  const initialDate = window.localStorage.getItem("targetDate") || "";
  const [title, setTitle] = useState(initialTitle);
  const [time, setTime] = useState(initialDate);

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [modal, setModal] = useState(false);

  const updateCountDown = () => {
    if (time) {
      const then = moment(time, "YYYY-MM-DDThh:mm");
      const now = moment();
      const duration = moment.duration(then.diff(now));
      if (duration > 0) {
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
    }
  };

  const handleSubmit = (title, time) => {
    window.localStorage.setItem("targetDate", time);
    window.localStorage.setItem("eventTitle", title);
    setTitle(title);
    setTime(time);
    setModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 1000);
    //clear interval on unmount
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="App">
      <svg className="top" height="200" width="100%">
        <ellipse cx="50%" cy="-120" rx="550" ry="300" fill="#fff" />
      </svg>
      <svg className="bottom" height="300" width="100%">
        <ellipse cx="50%" cy="420" rx="550" ry="300" fill="#D11A0F" />
      </svg>
      <div className="main">
        <button className="start-button" onClick={() => setModal(modal => !modal)}>
          {modal ? "CLOSE" : "CREATE EVENT"}
        </button>
        {modal ? <ConfigModal onSubmit={(title, time) => handleSubmit(title, time)} /> : null}

        <div className="event-title">{title}</div>
        <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
      </div>
    </div>
  );
}

export default App;
