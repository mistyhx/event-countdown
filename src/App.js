import React, { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import DateTimeSelection from "./components/DateTimeSelection";
import CountDownBoard from "./components/CountDownBoard";

function App() {
  const initialTitle = window.localStorage.getItem("eventTitle") || "";
  const initialDate = window.localStorage.getItem("targetDate") || "";

  const [title, setTitle] = useState("");
  const [datetime, setDateTime] = useState("");

  const [displayingTitle, setDisplayingTitle] = useState(initialTitle);
  const [targetdate, setTargetDate] = useState(initialDate);

  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [modal, setModal] = useState(false);

  const updateCountDown = () => {
    if (targetdate) {
      const then = moment(targetdate, "YYYY-MM-DDThh:mm");
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
    }
  };

  const handleSubmit = () => {
    window.localStorage.setItem("targetDate", datetime);
    window.localStorage.setItem("eventTitle", title);
    setDisplayingTitle(title);
    setTargetDate(datetime);
    setModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 1000);
    //clear interval on unmount
    return () => clearInterval(interval);
  }, [targetdate]);

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
        {modal ? (
          <DateTimeSelection
            datetime={datetime}
            title={title}
            onChange={value => setDateTime(value)}
            onChangeTitle={value => setTitle(value)}
            onSubmit={() => handleSubmit()}
          />
        ) : null}

        <div className="event-title">{displayingTitle}</div>
        <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
      </div>
    </div>
  );
}

export default App;
