import React, { useState } from "react";
import moment from "moment";
import "./index.css";

const ConfigModal = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(title, time);
        }}
      >
        <div className="event">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Event Name" required />
        </div>
        <div>
          <input
            type="datetime-local"
            name="datetime-local"
            value={time}
            onChange={e => setTime(e.target.value)}
            min={moment().format("YYYY-MM-DDThh:mm")}
            required
          />
        </div>
        <div>
          <input id="submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ConfigModal;
