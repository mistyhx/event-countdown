import React from "react";
import moment from "moment";
import "./index.css";

const DateTimeSelection = ({ datetime, onChange, onSubmit, title, onChangeTitle }) => {
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="event">
          <input type="text" value={title} onChange={e => onChangeTitle(e.target.value)} placeholder="Event Name" />
        </div>
        <div>
          <input
            type="datetime-local"
            name="datetime-local"
            value={datetime}
            onChange={e => onChange(e.target.value)}
            min={moment().format("YYYY-MM-DDThh:mm")}
          />
        </div>
        <div>
          <input id="submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default DateTimeSelection;
