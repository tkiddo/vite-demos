import React, { useState } from "react";

const Count = () => {
  console.log("Count run ");
  const [count, setCount] = useState(0);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
};

export default Count;
