import { useState } from "react";

//custom useOptimistic hook

const UseOptimistic = (initialState, reducer) => {
  const [state, setState] = useState(initialState);

  const updateState = (newData) => {
    setState((prevState) => reducer(prevState, newData));
  };
  return [state, updateState];
};

export default UseOptimistic;
