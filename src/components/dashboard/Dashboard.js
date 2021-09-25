import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import supp from "../assets/supp.svg";
import openDashAtom from "../../statesManager/atoms/openDashAtom";
import PriceIcon from "../assets/price.svg";
import DashIcon from "../assets/increase.svg";
import ProductivityIcon from "../assets/productivity.svg";
import finishedDatasAtom from "../../statesManager/atoms/finishedDatasAtom";
import projectDoneAtom from "../../statesManager/atoms/projectDoneAtom";
import DollarIcon from "../assets/symbole-du-dollar.svg";
import EuroIcon from "../assets/piece-en-euro.svg";
import backlog from "../assets/backlog.svg";
import TimerEndIcon from "../assets/timer.svg";
import StartIcon from "../assets/start.svg";
import CreatedIcon from "../assets/pencil.svg";
import CompletedIcon from "../assets/dash/completed-task.svg";
import TimeIcon from "../assets/dash/time.svg";
import ClockIcon from "../assets/dash/clock.svg";
import ChronoIcon from "../assets/dash/chronometer.svg";
import HourGlassIcon from "../assets/dash/hourglass.svg";
import AdjustIcon from "../assets/dash/adjust.svg";
import WorkingConnexionIcon from "../assets/dash/schedule.svg";
import TasksIcon from "../assets/tasks.svg";
import ProjectIcon from "../assets/project.svg";
import { v4 as uuidv4 } from "uuid";
import totalListTimeInSecondAtom from "../../statesManager/atoms/totalListTimeInSecondAtom";
import FirstChart from "../firstChart/FirstChart";
import SecondChart from "../firstChart/SecondChart";
import LastChart from "../firstChart/LastChart";
import useCustomAlertHook from "../../hooks/useCustomAlertHook";
import useCutDecimals from "../../hooks/useCutDecimals";
import useHmsToSeconds from "../../hooks/useHmsToSeconds";
import useAddSumStartStop from "../../hooks/useAddSumStartStop";
import useReverseArray from "../../hooks/useReverseArray";

const Dashboard = () => {
  const [totalTimeToSeconds, setTotalTimeToSeconds] = useRecoilState(
    totalListTimeInSecondAtom
  );

  const [changeDevise, setChangeDevise] = useState(true);
  const [totalTimeLocalStore] = useState(localStorage.getItem("time"));
  const [stockItemsByStatus] = useState(
    JSON.parse(localStorage.getItem("itemsByStatus"))
  );
  const [completCardsTimeArray] = useState(
    JSON.parse(localStorage.getItem("finishedData"))
  );
  const [totalTimeSeconds, setTotalTimeSeconds] = useState([]);
  const { mapRevers } = useReverseArray();

  let totalSum = [];
  const [connexionNumber, setConnexionNumber] = useState(0);
  const [finishedDatas] = useRecoilState(finishedDatasAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let startArrayTimes = [];
  let stopArray = [];
  const [projectDone] = useRecoilState(projectDoneAtom);
  // eslint-disable-next-line no-unused-vars
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);
  const [eurTjm, setEurTjm] = useState(0);
  const { tjm, setTjm, handlePrice } = useCustomAlertHook();
  const { hmsToSecondsOnly } = useHmsToSeconds();
  const { cutDecimals } = useCutDecimals();
  const changeEurDoll = 0.85;
  let totalEuro = eurTjm * changeEurDoll;
  // let newTaskArray = [];
  useEffect(() => {
    if (!tjm) {
      setEurTjm(0);
    }
  }, [tjm]);

  const handleChangeDevise = () => {
    setChangeDevise((changeDevise) => !changeDevise);
  };

  useEffect(() => {
    if (tjm) {
      localStorage.setItem("tjm", tjm);
      setEurTjm(tjm);
    } else if (tjm === 0) {
      localStorage.removeItem("tjm");
    }
    if (projectDone && tjm === 0) {
      return handlePrice();
    }
    // if (finishedDatas) {
    //   newTaskArray.push(finishedDatas.filter((res) => res.start !== ""));
    // }

    // console.log("completCardsTimeArray", newTaskArray[0]);
  }, [tjm, eurTjm, projectDone, handlePrice]);

  const { addSumStartStop } = useAddSumStartStop();

  const taskPerHour =
    stockItemsByStatus["To Do"].length +
    stockItemsByStatus["In Progress"].length +
    stockItemsByStatus["Done"].length;

  const numberKeeped = 8;

  let cardIdTime = finishedDatas.map((res) => res.cardId);
  let cardTitleTime = finishedDatas.map((res) => res.cardTitle);

  useEffect(() => {
    if (totalSum !== []) {
      setTotalTimeSeconds(...totalTimeSeconds, totalSum);
    }
    console.log("totalTimeSeconds", totalTimeSeconds);

    let startedTime = finishedDatas.map((res) => res.start);
    let finishedTime = finishedDatas.map((res) => res.stop);

    for (let i = 0; i < startedTime.length; i++) {
      const startTask = startedTime[i];
      const hoursToMinStartTask = startTask.substring(
        startTask.length - numberKeeped
      );
      const startTaskResult = hmsToSecondsOnly(hoursToMinStartTask);
      startArrayTimes.push(startTaskResult);
    }

    for (let i = 0; i < finishedTime.length; i++) {
      const stopTask = finishedTime[i];
      const hoursToMinStopTask = stopTask.substring(
        stopTask.length - numberKeeped
      );
      const stopTaskResult = hmsToSecondsOnly(hoursToMinStopTask);
      stopArray.push(stopTaskResult);
    }

    // console.log("startTaskForArray", startArrayTimes);

    if (
      projectDone &&
      localStorage.getItem("startArrayTimes") === null &&
      localStorage.getItem("stopArrayTimes") === null
    ) {
      localStorage.setItem("startArrayTimes", [...startArrayTimes]);
      localStorage.setItem("stopArrayTimes", [...stopArray]);
    }
    if (projectDone && startArrayTimes.length > 0 && stopArray.length > 0) {
      addSumStartStop(
        stopArray,
        startArrayTimes,
        totalSum,
        cardIdTime,
        cardTitleTime,
        totalTimeSeconds
      );
    }

    localStorage.setItem("connexionNumber", totalSum.length);
    setConnexionNumber(localStorage.getItem("connexionNumber"));

    // if (projectDone && newTaskArray) {
    //   const counts = newTaskArray[0]
    //     .map((resu) => resu.cardTitle)
    //     .reduce(
    //       (acc, value) => ({
    //         ...acc,
    //         [value]: (acc[value] || 0) + 1,
    //       }),
    //       {}
    //     );
    //   localStorage.setItem("counts", JSON.stringify(counts));
    //   console.log("total:", counts);
    // }

    // console.log(
    //   "totalSum:",
    //   totalSum.map((res, i) => res)
    // );

    // check();
    // console.log("ObjIdToFind", unifySameCard);
    // console.log("count", counts[0]);

    // console.log("test", countInArray(finishedDatas, comparId)); // returns 2
    // console.log("newTaskArray", newTaskArray);
    // console.log("finishedDatas", finishedDatas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishedDatas, setTotalTimeToSeconds, totalTimeToSeconds, projectDone]);

  // function check() {
  //   let count = 0;
  //   var arr = newTaskArray[0].map((resu) => resu.cardId);
  //   for (let i = 0; i < arr.length; i++) {
  //     for (let x = 0; x < arr.length; x++) {
  //       if (arr[i] === arr[x] && i !== x && arr[i].start !== "") {
  //         count++;
  //         console.log("SAME ones in ARRAY: " + arr[i]);
  //         console.log("count", count);
  //       } else console.log("no same ones");
  //     }
  //   }
  //   return count;
  // }

  let Note1Content = localStorage.getItem("valueNote1");
  let Note2Content = localStorage.getItem("valueNote2") ?? null;
  let Note3Content = localStorage.getItem("valueNote3") ?? null;
  let Note4Content = localStorage.getItem("valueNote4") ?? null;

  return (
    <div className="dash-content scale-in-ver-bottom">
      <div className="header-dash">
        <div className="headerDash-logo">
          <img src={ProductivityIcon} alt="dash" style={{ width: 55 }} />
          <h1>Dashboard</h1>
        </div>

        <div className="closeButton-container">
          <button
            title="Close the Dashboard!"
            data-toggle="tooltip"
            data-placement="left"
            className="closeButtonDash"
            onClick={() => setOpenDash(false)}
          >
            <strong className="rotate">X</strong>
          </button>
        </div>
      </div>
      <div style={{ position: "relative" }} className="dashContent-container">
        <div onClick={handlePrice} className="tjm-button">
          <button
            className="tjmButtonActif"
            disabled={tjm !== 0 ? true : false}
          >
            <img
              title={
                tjm === 0
                  ? "Your Daily rate here!"
                  : "Erase your Daily rate before enter an other"
              }
              data-toggle="tooltip"
              data-placement="left"
              className={tjm === 0 ? "priceIcon" : "priceIcon sepia"}
              src={PriceIcon}
              alt="price"
              style={{
                width: 44,

                cursor: "pointer",
              }}
            />
          </button>
        </div>
        <div className="priceContainer">
          <img
            onClick={() => setTjm(0)}
            className={tjm !== 0 ? "eraseTjmButton" : "none"}
            title="Erase your Daily rate here!"
            data-toggle="tooltip"
            data-placement="left"
            src={supp}
            alt="suppr"
            style={{ width: 16 }}
          />

          <span className="priceTextContainer">
            <p>
              {!changeDevise ? "€" : "$"}
              {changeDevise ? tjm : totalEuro}
            </p>
            <p>
              {changeDevise ? "€" : "$"}
              {changeDevise ? totalEuro : !changeDevise ? tjm : 0}
            </p>
          </span>
          <button
            onClick={handleChangeDevise}
            style={{
              width: 35,
              marginLeft: 25,
              background: "transparent",
              border: "none",
            }}
          >
            <img
              className="bump"
              title={
                changeDevise
                  ? "You are in Dollars, you can change the value to Euros"
                  : "You are in Euros, you can change the value to Dollars"
              }
              data-toggle="tooltip"
              data-placement="left"
              src={changeDevise ? DollarIcon : EuroIcon}
              alt=""
              style={{ width: 35 }}
            />
          </button>
        </div>

        <div className="dashContainer-header">
          <div className="dashContainer-content-header">
            <strong>Total Time:</strong>
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 3600, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>hours</sub>
            </p>
            <hr />
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {!changeDevise ? "€" : "$"}
              {changeDevise
                ? cutDecimals(tjm / 8, 2)
                : cutDecimals((tjm / 8) * changeEurDoll, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>per hour</sub>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong>Total days work:</strong>{" "}
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 28800, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>days</sub>
            </p>
            <hr />
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {!changeDevise ? "€" : "$"}
              {changeDevise
                ? cutDecimals((tjm * totalTimeLocalStore) / 28800, 2)
                : cutDecimals(
                    ((tjm * totalTimeLocalStore) / 28800) * changeEurDoll,
                    2
                  )}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>total</sub>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong> Number Tasks:</strong>{" "}
            {stockItemsByStatus && (
              <Fragment>
                <p style={{ fontWeight: "bold", fontSize: 25 }}>
                  {stockItemsByStatus["Done"].length}{" "}
                  <sub style={{ fontSize: 11, fontStyle: "italic" }}>tasks</sub>
                </p>
                <hr />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{ color: "white", fontWeight: "bold", fontSize: 25 }}
                  >
                    {cutDecimals(totalTimeLocalStore / 3600 / taskPerHour, 2)}
                  </p>
                  <sub style={{ fontSize: 11, color: "white" }}>hour/task</sub>
                </span>
              </Fragment>
            )}
          </div>
        </div>
        <br />
        <span className="statsTitle">
          {" "}
          <img
            style={{ marginRight: 12 }}
            src={DashIcon}
            alt="start"
            width="48"
          />
          <span className="dashTask-title">Stats</span>
        </span>
        <div className="tasks-dash graphs">
          <div className="todo-dash">
            <div className="list-dash graphDash">
              <FirstChart />
            </div>
          </div>
          <div className="inProgress-dash">
            <div className="list-dash graphDash">
              <SecondChart />
            </div>
          </div>
          <div className="done-dash">
            <div className="list-dash graphDash">
              <LastChart />
            </div>
          </div>
        </div>
        <div className="tasks-dash bottomSection">
          <div className="todo-dash">
            <span>
              {" "}
              <img
                style={{ marginRight: 12 }}
                src={ProjectIcon}
                alt="start"
                width="48"
              />
              <span className="dashTask-title">Sticky Notes</span>
            </span>
            <div className="list-dash stickyNotes">
              <div className="stickyListNoteDash">
                {Note1Content ? (
                  <Fragment>
                    <span style={{ color: "darkblue", fontWeight: "bold" }}>
                      Sticky Note:1
                    </span>
                    <br />
                    <span>{Note1Content}</span>
                  </Fragment>
                ) : (
                  <strong style={{ color: "darkred" }}>None</strong>
                )}
              </div>
              <div className="stickyListNoteDash">
                {Note2Content ? (
                  <Fragment>
                    <span style={{ color: "darkblue", fontWeight: "bold" }}>
                      Sticky Note:2
                    </span>
                    <br />
                    <span>{Note2Content}</span>
                  </Fragment>
                ) : (
                  <strong style={{ color: "darkred" }}>None</strong>
                )}
              </div>
              <div className="stickyListNoteDash">
                {Note3Content ? (
                  <Fragment>
                    <span style={{ color: "darkblue", fontWeight: "bold" }}>
                      Sticky Note:3
                    </span>
                    <br />
                    <span>{Note3Content}</span>
                  </Fragment>
                ) : (
                  <strong style={{ color: "darkred" }}>None</strong>
                )}
              </div>

              <div className="stickyListNoteDash">
                {Note4Content ? (
                  <Fragment>
                    <span style={{ color: "darkblue", fontWeight: "bold" }}>
                      Sticky Note:4
                    </span>
                    <br />
                    <span>{Note4Content}</span>
                  </Fragment>
                ) : (
                  <strong style={{ color: "darkred" }}>None</strong>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="inProgress-dash">
          <span>
            {" "}
            <img
              style={{ marginRight: 12 }}
              src={TasksIcon}
              alt="start"
              width="48"
            />
            <span className="dashTask-title">Number working connexion</span>
          </span>
          <div className="list-dash workingConnexion">
            <div className="workingConnexionContent">
              <img
                style={{ marginRight: 12 }}
                src={WorkingConnexionIcon}
                alt="start"
                width="34"
              />
              {isNaN(connexionNumber) === false ? (
                <span>
                  Working connexion:{" "}
                  {cutDecimals(
                    connexionNumber / stockItemsByStatus["Done"].length,
                    0
                  )}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="tasks-dash cardsRapport">
          <div className="done-dash">
            <span>
              <img
                style={{ marginRight: 12 }}
                src={CompletedIcon}
                alt="start"
                width="44"
              />
              <span className="dashTask-title">Tasks Done</span>
            </span>
            {stockItemsByStatus && (
              <div className="list-dash">
                {stockItemsByStatus["Done"].length > 0 ? (
                  stockItemsByStatus["Done"].map((res, i) => (
                    <ul key={uuidv4()}>
                      <li>
                        <strong style={{ fontSize: 11 }}>
                          Name: {res.title}
                        </strong>
                        <p>id :{res.id}</p>
                        <p style={{ fontSize: 12 }}>desc: {res.description}</p>
                        <span className="createdTaskDash">
                          <img src={CreatedIcon} alt="start" width="28" />
                          <p style={{ fontSize: 12 }}>
                            Created: {res.timestamp}
                          </p>
                        </span>
                      </li>
                    </ul>
                  ))
                ) : (
                  <strong style={{ color: "darkred", fontWeight: "bold" }}>
                    No tasks in this section
                  </strong>
                )}
              </div>
            )}
          </div>
          <div className="todo-dash">
            <span>
              {" "}
              <img
                style={{ marginRight: 12 }}
                src={HourGlassIcon}
                alt="start"
                width="44"
              />
              <span className="dashTask-title">
                Working session that required more than 2 hours
              </span>
            </span>
            <div className="list-dash">
              {finishedDatas !== [] ? (
                totalTimeSeconds &&
                totalTimeSeconds
                  .filter((totMax) => totMax.total >= 7200)
                  .map((res, i) => (
                    <ul key={uuidv4()}>
                      {isNaN(res.total) === false ? (
                        <li>
                          <strong>{res.title}</strong>
                          <br />
                          <sub>{res.id}</sub>
                          <br />
                          <span className="timeContent">
                            <img
                              style={{ marginRight: 12 }}
                              src={AdjustIcon}
                              alt="start"
                              width="24"
                            />
                            <p style={{ fontSize: 15, fontWeight: "bold" }}>
                              {new Date(res.total * 1000)
                                .toISOString()
                                .substr(11, 8)}{" "}
                              hour(s)
                            </p>
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  ))
              ) : (
                <strong style={{ color: "darkred", fontWeight: "bold" }}>
                  No Working session in this section
                </strong>
              )}
            </div>
          </div>
          <div className="todo-dash">
            <span>
              <img
                style={{ marginRight: 12 }}
                src={ChronoIcon}
                alt="start"
                width="44"
              />
              <span className="dashTask-title">
                Working session that required between 1 and 2 hour(s)
              </span>
            </span>
            <div className="list-dash">
              {finishedDatas !== [] ? (
                totalTimeSeconds &&
                totalTimeSeconds
                  .filter(
                    (totMax) => totMax.total >= 3600 && totMax.total < 7200
                  )
                  .map((res, i) => (
                    <ul key={uuidv4()}>
                      {isNaN(res.total) === false ? (
                        <li>
                          <strong>{res.title}</strong>
                          <br />
                          <sub>{res.id}</sub>
                          <br />
                          <span className="timeContent">
                            <img
                              style={{ marginRight: 12 }}
                              src={AdjustIcon}
                              alt="start"
                              width="24"
                            />
                            <p style={{ fontSize: 15, fontWeight: "bold" }}>
                              {new Date(res.total * 1000)
                                .toISOString()
                                .substr(11, 8)}{" "}
                              hour(s)
                            </p>
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  ))
              ) : (
                <strong style={{ color: "darkred", fontWeight: "bold" }}>
                  No Working session in this section
                </strong>
              )}
            </div>
          </div>
          <div className="inProgress-dash">
            <span>
              <img
                style={{ marginRight: 12 }}
                src={ClockIcon}
                alt="start"
                width="48"
              />
              <span className="dashTask-title">
                Working session that required less than 1 hour
              </span>
            </span>
            <div className="list-dash less1hour">
              {finishedDatas !== [] ? (
                totalTimeSeconds &&
                totalTimeSeconds
                  .filter((totMax) => totMax.total > 0)
                  .filter((totMax) => totMax.total < 3600)
                  .map((res, i) => (
                    <ul key={uuidv4()}>
                      {isNaN(res.total) === false ? (
                        <li>
                          <strong>{res.title}</strong>
                          <br />
                          <sub>{res.id}</sub>
                          <br />
                          <span className="timeContent">
                            <img
                              style={{ marginRight: 12 }}
                              src={AdjustIcon}
                              alt="start"
                              width="24"
                            />
                            <p style={{ fontSize: 15, fontWeight: "bold" }}>
                              {new Date(res.total * 1000)
                                .toISOString()
                                .substr(11, 8)}{" "}
                              hour(s)
                            </p>
                          </span>
                        </li>
                      ) : null}
                    </ul>
                  ))
              ) : (
                <strong style={{ color: "darkred", fontWeight: "bold" }}>
                  No Working session in this section
                </strong>
              )}
            </div>
          </div>
          <div className="bottom-dash">
            <span>
              <img
                style={{ marginRight: 12 }}
                src={TimeIcon}
                alt="start"
                width="44"
              />
              <span className="dashTask-title">Time Elapsed For each Task</span>
              <sub>from the most recent session to the oldest</sub>
            </span>
            <div className="list-dash bottom">
              {mapRevers(completCardsTimeArray)
                .filter((resFiltered) => resFiltered.start !== "")
                .map((res) => (
                  <div key={uuidv4()}>
                    <strong>{res.cardTitle}</strong>
                    <br />
                    <span>
                      <img src={StartIcon} alt="start" width="34" />
                      <p style={{ fontWeight: "bold", color: "#57a957" }}>
                        Start: {res.start}
                      </p>
                    </span>
                    <img src={TimerEndIcon} alt="stop" width="34" />
                    <p style={{ fontWeight: "bold", color: "#ca3535" }}>
                      Stop: {res.stop}
                    </p>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>

        <br />
        <div className="footerDash">
          <div className="copyrightContent">
            <img
              src={backlog}
              alt="backlog"
              width="34"
              style={{ marginRight: 10 }}
            />
            Copyright - 2021 © Created with React by{" "}
            <a
              className="linkName"
              title="Visit my WebSite if you want!"
              data-toggle="tooltip"
              data-placement="top"
              style={{ color: "rgb(121 204 82)" }}
              href="https://www.rodolphe-augusto.fr"
              target="new"
            >
              rodolphe Augusto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
