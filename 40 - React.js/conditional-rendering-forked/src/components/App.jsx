import React from "react";
import LoginComponent from "./LoginComponent";

var isLoggedIn = false;

function App() {
  return (
    <div className="container">
      {isLoggedIn ? <h1>Hello</h1> : <LoginComponent />}
    </div>
  );
}

export default App;
