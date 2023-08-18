import React from "react";

function App() {
  let time = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  });

  const [currentTime, setCurrentTime] = React.useState(time);

  function CheckTime() {
    let now = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
    setCurrentTime(now);
  }

  setInterval(CheckTime, 1000);

  return (
    <div className="container">
      <h1>{currentTime}</h1>
      <button onClick={CheckTime}>Get Time</button>
    </div>
  );
}

export default App;
