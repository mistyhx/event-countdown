import React, { useState } from "react";

const DateTimeSelection = () => {
  const [datetime, setDatetime] = useState("");
  return (
    <div className="container">
      <form
        onSubmit={e => {
          e.preventDefault();
          alert(typeof datetime);
        }}
      >
        <input
          type="datetime-local"
          name="datetime-local"
          value={datetime}
          onChange={e => setDatetime(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default DateTimeSelection;
