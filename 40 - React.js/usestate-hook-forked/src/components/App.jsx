import React, { useState } from "react";

function App() {
  const [number, setCount] = useState(0);

  function increase() {
    setCount(number + 1);
  }
  function decrease() {
    setCount(number - 1);
  }

  return (
    <div className="container">
      <h1>{number}</h1>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
    </div>
  );
}
//<button onClick={(number) => setCount(number + 1)}>+</button>

export default App;
