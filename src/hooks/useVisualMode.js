import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {

    if (replace) {
      setHistory(prev => ([...prev, newMode]))
    }
    history.push(newMode);
    setMode(newMode);
  };

  const back = function () {

    if (history.length === 1) {
      setMode(initial)
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }
  
  };

  return { mode, transition, back };
};