import React, { useState } from "react";

function App() {

  const[textValue, setTextValue] = useState("");

  function handleClick() {
    fetch("http://localhost:9000/"/*https://12d24246-87c1-407d-b4b2-94cce83f25b1.mock.pstmn.io"*/)
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
