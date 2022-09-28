import React, { useState, useTransition } from "react";

const Count = () => {
  console.log("Count run ");
  const [count, setCount] = useState(0);
  const [pending, startTransition] = useTransition();
  return (
    <>
      <div>{pending ? "changing" : count}</div>
      <button onClick={() => startTransition(() => setCount(count + 1))}>
        +
      </button>
    </>
  );
};

export default Count;
