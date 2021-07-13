import { useState } from "react";

export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    if(replace) {
      history.pop()
      setHistory(history);
    }
      
    setHistory(prevArray => [...prevArray, newMode]);
    setMode(newMode);

  };

  const back = function () {

    console.log('back called');

    if (history.length === 1) {
      setMode(initial)
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }

  };

  return { mode, transition, back };
};