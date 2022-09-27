import React, { useState } from "react";
import Header from "./components/Header";
import Count from "./components/Count";

const App = () => {
  console.log("App run ");
  const [msg, setMsg] = useState("Hello");
  return (
    <>
      <div>{msg}</div>
      <button onClick={() => setMsg("Hi" + Math.random())}>Change</button>
      <Header />
      <Count />
    </>
  );
};

export default App;
