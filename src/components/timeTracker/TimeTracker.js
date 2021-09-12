import React, { useState, useEffect, useRef } from "react";
import "./timeTracker.css";
import TimerImg from "../assets/time-management.svg";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = JSON.parse(localStorage.getItem("time")) ?? 0;

let d = new Date();
let n = d.toLocaleString();

export default function TimeTracker() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [dayWork, setDayWork] = useState(0);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useEffect(() => {
    console.log("INITIAL_COUNT", INITIAL_COUNT);
  }, []);
  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
    localStorage.setItem("time", secondsRemaining);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    localStorage.removeItem("time");
    setSecondsRemaining(0);
  };
  useInterval(
    () => {
      if (secondsRemaining >= 0) {
        setSecondsRemaining(secondsRemaining + 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );

  useEffect(() => {
    function getDaysWork() {
      setDayWork(hoursToDisplay / 8);
    }
    if (hoursToDisplay >= 1) {
      getDaysWork();
    }
  }, [hoursToDisplay]);
  return (
    <div className="time-tracker">
      <div className="trackTimeTitle">
        <img
          src={TimerImg}
          alt=""
          className={status === STATUS.STARTED ? "logo heartbeat" : "logo"}
        />
        <h1 className={status === STATUS.STARTED ? "redColor" : ""}>
          Track Time
        </h1>
      </div>
      <h2>Date - {n}</h2>
      <div className="button-group">
        <button
          disabled={status === STATUS.STARTED ? true : false}
          className="small green button"
          onClick={handleStart}
          type="button"
        >
          Start
        </button>
        <button
          disabled={status === STATUS.STOPPED ? true : false}
          className="small red button"
          onClick={handleStop}
          type="button"
        >
          Stop
        </button>
        <button
          disabled={status === STATUS.STARTED ? true : false}
          className="small blue button"
          onClick={handleReset}
          type="button"
        >
          Reset
        </button>
      </div>
      <div style={{ padding: 20 }}>
        {threeDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <span>{`${dayWork} ${dayWork > 2 ? "days" : "day"}`}</span>
      <div className="indicator-section">
        <span
          className="status-indicator"
          style={
            status === STATUS.STARTED
              ? {
                  backgroundColor: "green",
                  animation: "backgroundColor 0.6s ease-in-out",
                }
              : status === STATUS.STOPPED
              ? {
                  backgroundColor: "red",
                  animation: "backgroundColor 0.6s ease-in-out",
                }
              : { backgroundColor: "orange" }
          }
        ></span>
        <div>Status: {status}</div>
      </div>
    </div>
  );
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");
const threeDigits = (num) => String(num).padStart(3, "0");
