import React, { useState, useEffect, useRef } from "react";
import "./timeTracker.css";
import TimerImg from "../assets/time-management.svg";
import useDateTime from "../../hooks/useDateTime";
import { useRecoilState } from "recoil";
import automaticTrackTimerAtom from "../../statesManager/atoms/automaticTrackTimerAtom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalConfigComponent from "../modalConfig/ModalConfigComponent";
// import clickedConfigAtom from "../../statesManager/atoms/clickedConfigAtom";
import clickedAddToDoAtom from "../../statesManager/atoms/clickedAddToDoAtom";
import { Fragment } from "react";
import itemsByStautsAtom from "../../statesManager/atoms/itemsByStatusAtom";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = JSON.parse(localStorage.getItem("time")) ?? 0;

export default function TimeTracker({ itemsByStatus }) {
  const MySwal = withReactContent(Swal);
  const { n } = useDateTime();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(
    localStorage.getItem("status") === "Started"
      ? localStorage.getItem("status")
      : STATUS.STOPPED
  );
  const [dayWork, setDayWork] = useState(0);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const [autoTrackTime] = useRecoilState(automaticTrackTimerAtom);
  // const [clickedConfig, setClickedConfig] = useRecoilState(clickedConfigAtom);
  const [clickedAddButton] = useRecoilState(clickedAddToDoAtom);
  const [stockItemsByStatus, setStockItemsByStatus] =
    useRecoilState(itemsByStautsAtom);

  useEffect(() => {
    // console.log("itemsByStatus", itemsByStatus);
    if (itemsByStatus) {
      setStockItemsByStatus(itemsByStatus);
    }
  }, [setStockItemsByStatus, itemsByStatus]);
  const handleStart = () => {
    setStatus(STATUS.STARTED);
    localStorage.setItem("status", "Started");
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
    localStorage.setItem("status", "Stopped");
  };

  useEffect(() => {
    if (autoTrackTime && clickedAddButton) {
      setStatus(STATUS.STARTED);
    } else if (autoTrackTime && !clickedAddButton) {
      setStatus(STATUS.STOPPED);
    }
    if (autoTrackTime) {
      if (itemsByStatus["In Progress"].length > 0) {
        setStatus(STATUS.STARTED);
      }
      if (itemsByStatus["In Progress"].length === 0) {
        setStatus(STATUS.STOPPED);
      }
      // eslint-disable-next-line no-self-compare
      if (itemsByStatus["Done"].length > itemsByStatus["Done"].length) {
        setStatus(STATUS.STOPPED);
      }
    }
    if (status === STATUS.STOPPED) {
      // If you close the window whitout stop the counter
      localStorage.setItem("time", secondsRemaining);
    }
    // If the status is started that send the time each second elapsed
    return () => {
      localStorage.setItem("time", secondsRemaining);
    };
  }, [
    secondsRemaining,
    status,
    itemsByStatus,
    autoTrackTime,
    clickedAddButton,
  ]);

  const handleReset = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setStatus(STATUS.STOPPED);
        localStorage.removeItem("time");
        setSecondsRemaining(0);
        Swal.fire(
          "Reinitialized!",
          "the Time Tracker is well reset.",
          "success"
        );
      }
    });
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
      {!autoTrackTime ? (
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
          {/*<button onClick={handleclickConfig}>
          <img style={{ width: 34 }} src={configIcon} alt="config" />
  </button>*/}
          <ModalConfigComponent />
        </div>
      ) : (
        <Fragment>
          <button
            disabled={status === STATUS.STARTED ? true : false}
            className="small blue button autoTime"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
          <ModalConfigComponent />
        </Fragment>
      )}

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
