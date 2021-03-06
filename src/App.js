import React, { useState, useEffect } from "react";
import { animated, useTransition, useSpring } from "react-spring";
import moment from "moment";
import "./App.css";
import ConfigModal from "./components/ConfigModal";
import CountDownBoard from "./components/CountDownBoard";

function App() {
  //DATA STATES
  const initialTitle = window.localStorage.getItem("eventTitle") || "";
  const initialDate = window.localStorage.getItem("targetDate") || "";
  const [title, setTitle] = useState(initialTitle);
  const [time, setTime] = useState(initialDate);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  //TOGGLE STATES
  const [modal, setModal] = useState(false);
  const [finished, setFinished] = useState(false);

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
    config: { duration: 1500 },
  });

  const [reset, setReset] = useState(false);

  const props = useSpring({
    from: {
      opacity: 0,
      rx: 100,
      ry: 50,
    },
    to: {
      opacity: 1,
      rx: 550,
      ry: 300,
    },
    config: {
      mass: 3,
      easing: "ease",
    },
    reset: reset,
    onStart: () => setReset(false),
  });

  //UTIL FUNCTIONS
  const updateCountDown = () => {
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
      //reset all the value
      setDay(0);
      setHour(0);
      setMinute(0);
      setSecond(0);
      setFinished(true);
      setTime("");
      setTitle("");
      window.localStorage.removeItem("eventTitle");
      window.localStorage.removeItem("targetDate");
    }
  };

  const handleSubmit = (title, time) => {
    window.localStorage.setItem("targetDate", time);
    window.localStorage.setItem("eventTitle", title);
    setTitle(title);
    setTime(time);
    setModal(false);
    setReset(true);
  };

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => updateCountDown(), 1000);
      return () => clearInterval(interval);
    } else {
      return;
    }
  }, [time]);

  //RENDERING
  return (
    <div className="App">
      {finished ? (
        <div className="finished" onClick={() => setFinished(false)}>
          <span>Congratulation</span>
        </div>
      ) : (
        <div className="main">
          <svg className="top" height="200" width="100%">
            <animated.ellipse style={props} cx="50%" cy="-120" fill="#fff" />
          </svg>

          <svg className="bottom" height="300" width="100%">
            <animated.ellipse style={props} cx="50%" cy="420" fill="#D11A0F" />
          </svg>
          <button className="start-button" onClick={() => setModal(modal => !modal)}>
            {modal ? "CLOSE" : "CREATE EVENT"}
          </button>
          <div className="event-title">{time ? title : "CREATE EVENT"}</div>
          {numberTransitions.map(({ item, key, props }) =>
            item ? (
              <animated.div className="countdown-container" key={key} style={props}>
                <CountDownBoard day={day} hour={hour} minute={minute} second={second} />
              </animated.div>
            ) : (
              <animated.div className="countdown-container" key={key} style={props}>
                <CountDownBoard day="0" hour="0" minute="0" second="0" />
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
      )}
    </div>
  );
}

export default App;
