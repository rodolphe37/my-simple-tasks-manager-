import React, { useState, useEffect, useRef } from "react";
import "./timeTracker.css";
import TimerImg from "../assets/time-management.svg";
import useDateTime from "../../hooks/useDateTime";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = JSON.parse(localStorage.getItem("time")) ?? 0;

export default function TimeTracker() {
  const { n } = useDateTime();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [dayWork, setDayWork] = useState(0);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useEffect(() => {
    // console.log("INITIAL_COUNT", INITIAL_COUNT);
  }, []);
  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };

  useEffect(() => {
    // If you close the window whitout stop the counter
    if (status === STATUS.STOPPED) {
      localStorage.setItem("time", secondsRemaining);
    }
    // If the status is started that send the time each second elapsed
    return () => {
      localStorage.setItem("time", secondsRemaining);
    };
  }, [secondsRemaining, status]);

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

  // Function for cutting number at x decimal
  function cutDecimals(number, decimals) {
    return number.toLocaleString("fullwide", {
      maximumFractionDigits: decimals,
    });
  }

  useEffect(() => {
    function getDaysWork() {
      // Cut decimal usage ( seconds elapsed / senconds contained in 8 hours(3600 x 8 = 28800), and number of decimal you want to cut)
      setDayWork(cutDecimals(secondsRemaining / 28800, 2));
    }
    // If the total of seconds is at least 8 hours -> it increments one day then,
    // beyond 1 day, it automatically synchronizes the number of days worked (two digits after the decimal point).
    if (secondsRemaining >= 3600) {
      getDaysWork();
    }
  }, [secondsRemaining]);
  return (
    <div className="time-tracker">
      <div className="trackTimeTitle">
        <img
          src={TimerImg}
          alt=""
          className={status === STATUS.STARTED ? "logo heartbeat" : "logo"}
        />
        <h1 className={status === STATUS.STARTED ? "redColor" : ""}>
          {status === STATUS.STARTED ? "Track Time" : "Time Tracker"}
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
      <div className="time-lapse">
        {threeDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <span>{`${dayWork} day(s)`}</span>
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
        <div>{status}</div>
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
