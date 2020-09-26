import React, { useState } from "react";

function App() {
  const [textValue, setTextValue] = useState("");

  function handleClick() {
    fetch("/test")
      .then((res) => res.text())
      .then((res) => setTextValue(res));
  }

  return (
    <div>
      <h1>Bug Tracker Project - Under Construction</h1>
      <button onClick={handleClick}> Display Back-end data</button>
      <label>{textValue}</label>
    </div>
  );
}

export default App;
