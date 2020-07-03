import React, { useState, useEffect } from "react";
import { animated, useTransition, useSpring } from "react-spring";
import moment from "moment";
import "./App.css";
import ConfigModal from "./components/ConfigModal";
import CountDownBoard from "./components/CountDownBoard";

function App() {
  //DATA STATES
  const initialTitle = window.localStorage.getItem("eventTitle") || "MY EVENT";
  const initialDate = window.localStorage.getItem("targetDate") || "";
  const [title, setTitle] = useState(initialTitle);
  const [time, setTime] = useState(initialDate);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  //TOGGLE STATES
  const [modal, setModal] = useState(false);

  //SPRING ANIMATIONS

  const modalTransitions = useTransition(modal, null, {
    from: { transform: "rotateZ(90deg)", transformOrigin: "top right" },
    enter: { transform: "rotateZ(0deg)" },
    leave: { transform: "rotateZ(90deg)" },
  });

  const numberTransitions = useTransition(time, null, {
    from: { opacity: 0, color: "#d11a0f" },
    enter: { opacity: 1, color: "black" },
    leave: { opacity: 0, color: "#d11a0f" },
    config: { duration: 1000 },
  });

  //UTIL FUNCTIONS
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
    return () => clearInterval(interval);
  }, [time]);

  //RENDERING
  return (
    <div className="App">
      <svg className="top" height="200" width="100%">
        <ellipse className="top-circle" cx="50%" cy="-120" rx="550" ry="300" fill="#fff" />
      </svg>
      <svg className="bottom" height="300" width="100%">
        <ellipse className="bottom-circle" cx="50%" cy="420" rx="550" ry="300" fill="#D11A0F" />
      </svg>
      <div className="main">
        <button className="start-button" onClick={() => setModal(modal => !modal)}>
          {modal ? "CLOSE" : "CREATE EVENT"}
        </button>

        <div className="event-title">{title}</div>
        {numberTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className="countdown-container" key={key} style={props}>
                <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
              </animated.div>
            )
        )}

        {modalTransitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <ConfigModal onSubmit={(title, time) => handleSubmit(title, time)} />️
              </animated.div>
            )
        )}
      </div>
    </div>
  );
}

export default App;
