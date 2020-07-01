import React from "react";
import "./index.css";

const Card = ({ number, unit }) => {
  return (
    <div className="block">
      <div className="number">{number}</div>
      <div className="unit">{unit.toUpperCase()}</div>
    </div>
  );
};

const CountDownBoard = ({ day, hour, minute, second }) => {
  return (
    <div className="countdown-board">
      <Card number={day} unit="days" />
      <Card number={hour} unit="hours" />
      <Card number={minute} unit="minutes" />
      <Card number={second} unit="seconds" />
    </div>
  );
};

export default CountDownBoard;
