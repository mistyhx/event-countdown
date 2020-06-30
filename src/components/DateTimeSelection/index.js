import React from "react";
import moment from "moment";

const DateTimeSelection = ({ datetime, onChange, onSubmit }) => {
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input
          type="datetime-local"
          name="datetime-local"
          value={datetime}
          onChange={e => onChange(e.target.value)}
          min={moment().format("YYYY-MM-DDThh:mm")}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default DateTimeSelection;
