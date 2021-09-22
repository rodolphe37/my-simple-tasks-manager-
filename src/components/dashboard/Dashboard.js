import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import supp from "../assets/supp.svg";
import itemsByStatusAtom from "../../statesManager/atoms/itemsByStatusAtom";
import openDashAtom from "../../statesManager/atoms/openDashAtom";
import PriceIcon from "../assets/price.svg";
import DashIcon from "../assets/increase.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import finishedDatasAtom from "../../statesManager/atoms/finishedDatasAtom";
import projectDoneAtom from "../../statesManager/atoms/projectDoneAtom";
import DollarIcon from "../assets/symbole-du-dollar.svg";
import EuroIcon from "../assets/piece-en-euro.svg";
import backlog from "../assets/backlog.svg";
import { v4 as uuidv4 } from "uuid";
import totalListTimeInSecondAtom from "../../statesManager/atoms/totalListTimeInSecondAtom";

const Dashboard = () => {
  const [totalTimeToSeconds, setTotalTimeToSeconds] = useRecoilState(
    totalListTimeInSecondAtom
  );
  const [itemsByStatus] = useRecoilState(itemsByStatusAtom);
  const [changeDevise, setChangeDevise] = useState(true);
  // const [autoTrackTime] = useRecoilState(automaticTrackTimerAtom);
  const [totalTimeLocalStore] = useState(localStorage.getItem("time"));
  const [stockItemsByStatus] = useState(
    JSON.parse(localStorage.getItem("itemsByStatus"))
  );
  const [completCardsTimeArray] = useState(
    JSON.parse(localStorage.getItem("finishedData"))
  );
  const [totalAllCArdsTimeSeconds] = useState(
    JSON.parse(localStorage.getItem("totalTimeInSeconds"))
  );
  const [finishedDatas] = useRecoilState(finishedDatasAtom);
  const [projectDone] = useRecoilState(projectDoneAtom);
  // eslint-disable-next-line no-unused-vars
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);
  const [tjm, setTjm] = useState(localStorage.getItem("tjm") ?? 0);
  const [eurTjm, setEurTjm] = useState(0);
  const MySwal = withReactContent(Swal);
  function cutDecimals(number, decimals) {
    return number.toLocaleString("fullwide", {
      maximumFractionDigits: decimals,
    });
  }
  const changeEurDoll = 0.85;
  let totalEuro = eurTjm * changeEurDoll;
  useEffect(() => {
    if (!tjm) {
      setEurTjm(0);
    }
  }, [tjm]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePrice = () => {
    MySwal.fire({
      title: "Enter your Daily Rate in dollars",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(result);
        setTjm(result.value);
        Swal.fire("Saved!", "Your daily rate has been saved.", "success");
      }
    });
  };

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
    console.log("changeDevise", changeDevise);
  }, [
    tjm,
    setEurTjm,
    eurTjm,
    MySwal,
    projectDone,
    handlePrice,
    stockItemsByStatus,
    changeDevise,
  ]);

  const taskPerHour =
    stockItemsByStatus["To Do"].length +
    stockItemsByStatus["In Progress"].length +
    stockItemsByStatus["Done"].length;

  // useEffect(() => {
  //   const idTimeCards = finishedDatas.map((res) => res.cardId);

  //   const startTimeCards = finishedDatas
  //     .filter((result) => result.start !== "")
  //     .map((res) => res.start);

  //   const stopTimeCards = finishedDatas
  //     .filter((result) => result.stop !== "")
  //     .map((res) => res.stop);

  //   const totalTimeAddition = () => {
  //     const numberKeeped = 8;

  //     const startTask = startTimeCards.map((res) => res.start);
  //     const hoursToMinStartTask = startTask.substring(
  //       startTask.length - numberKeeped
  //     );
  //     const stopTask = stopTimeCards.map((res) => res.stop);
  //     const hoursToMinStopTask = stopTask.substring(
  //       stopTask.length - numberKeeped
  //     );
  //     // console.log("startTask", hoursToMinStartTask);
  //     // console.log("cardIdCompleteTask", cardIdCompleteTask);

  //     function hmsToSecondsOnly(str) {
  //       let p = str.split(":"),
  //         s = 0,
  //         m = 1;
  //       while (p.length > 0) {
  //         s += m * parseInt(p.pop(), 10);
  //         m *= 60;
  //       }
  //       return s;
  //     }
  //     const startTaskResult = hmsToSecondsOnly(hoursToMinStartTask);
  //     const stopTaskResult = hmsToSecondsOnly(hoursToMinStopTask);
  //     // console.log("result :", startTaskResult);
  //     // console.log("result :", stopTaskResult);

  //     // setTotalTimeToSeconds((totalTimeToSeconds) =>
  //     //   totalTimeToSeconds.concat({
  //     //     cardId: item.id,
  //     //     totalTime: stopTaskResult - startTaskResult,
  //     //   })
  //     // );

  //     if (startTimeCards !== "" && stopTimeCards !== "") {
  //       setTotalTimeToSeconds((totalTimeToSeconds) =>
  //         totalTimeToSeconds.concat({
  //           cardId: idTimeCards,
  //           totalTime: stopTaskResult - startTaskResult,
  //           uuid: uuidv4(),
  //         })
  //       );
  //       localStorage.setItem(
  //         "totalTimeInSeconds",
  //         JSON.stringify(totalTimeToSeconds)
  //       );
  //     } else {
  //       return;
  //     }
  //   };
  //   // console.log(
  //   //   "compar id",
  //   //   cardIdCompleteTask.map((resu) => resu.cardId)
  //   // );
  //   // console.log("finishedDatas", finishedDatas);
  //   // if (totalTimeToSeconds !== null && status === "Done") {
  //   //   localStorage.setItem(
  //   //     "totalTimeInSeconds",
  //   //     JSON.stringify(totalTimeToSeconds)
  //   //   );
  //   // }

  //   // if (startTimeCards && stopTimeCards) {
  //   //   totalTimeAddition();
  //   // }

  //   console.log("startTimeCards", startTimeCards);
  //   console.log("stopTimeCards", stopTimeCards);
  //   // if (tjm === 0) {
  //   //   localStorage.setItem("tjm", 0);
  //   // }
  //   // console.log(
  //   //   "totalAllCArdsTimeSeconds",
  //   //   totalAllCArdsTimeSeconds.filter((res, i) => res.totalTime !== 0)
  //   // );
  // }, [finishedDatas, setTotalTimeToSeconds, totalTimeToSeconds]);

  // useEffect(() => {
  //   const cardIdCompleteTask = totalTimeToSeconds.filter((res) => res.cardId);

  //   const totalTimeAddition = () => {
  //     const numberKeeped = 8;

  //     const startTask = startWorkState;
  //     const hoursToMinStartTask = startTask.substring(
  //       startTask.length - numberKeeped
  //     );
  //     const stopTask = stopWorkState;
  //     const hoursToMinStopTask = stopTask.substring(
  //       stopTask.length - numberKeeped
  //     );
  //     // console.log("startTask", hoursToMinStartTask);
  //     // console.log("cardIdCompleteTask", cardIdCompleteTask);

  //     function hmsToSecondsOnly(str) {
  //       let p = str.split(":"),
  //         s = 0,
  //         m = 1;
  //       while (p.length > 0) {
  //         s += m * parseInt(p.pop(), 10);
  //         m *= 60;
  //       }
  //       return s;
  //     }
  //     const startTaskResult = hmsToSecondsOnly(hoursToMinStartTask);
  //     const stopTaskResult = hmsToSecondsOnly(hoursToMinStopTask);
  //     // console.log("result :", startTaskResult);
  //     // console.log("result :", stopTaskResult);

  //     // setTotalTimeToSeconds((totalTimeToSeconds) =>
  //     //   totalTimeToSeconds.concat({
  //     //     cardId: item.id,
  //     //     totalTime: stopTaskResult - startTaskResult,
  //     //   })
  //     // );

  //     if (
  //       TotalTimeStart !== "" &&
  //       TotalTimeStop !== "" &&
  //       status === "Done" &&
  //       item.id !== cardId
  //     ) {
  //       setTotalTimeToSeconds((totalTimeToSeconds) =>
  //         totalTimeToSeconds.concat({
  //           cardId: item.id,
  //           totalTime: stopTaskResult - startTaskResult,
  //           uuid: uuidv4(),
  //         })
  //       );
  //     } else {
  //       return;
  //     }
  //   };
  //   // console.log(
  //   //   "compar id",
  //   //   cardIdCompleteTask.map((resu) => resu.cardId)
  //   // );
  //   // console.log("finishedDatas", finishedDatas);
  //   // if (totalTimeToSeconds !== null && status === "Done") {
  //   //   localStorage.setItem(
  //   //     "totalTimeInSeconds",
  //   //     JSON.stringify(totalTimeToSeconds)
  //   //   );
  //   // }

  //   if (startWorkState && stopWorkState) {
  //     totalTimeAddition();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [startWorkState, stopWorkState, setTotalTimeToSeconds, item.id]);

  return (
    <div className="dash-content scale-in-ver-bottom">
      <div className="header-dash">
        <div className="headerDash-logo">
          <img src={DashIcon} alt="dash" style={{ width: 55 }} />
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
                  {stockItemsByStatus["To Do"].length +
                    stockItemsByStatus["In Progress"].length +
                    stockItemsByStatus["Done"].length}{" "}
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
        <div className="tasks-dash graphs">
          <div className="todo-dash">
            <div className="list-dash graphDash">
              <strong>Graph Hours</strong>
              <div>Graph</div>
            </div>
          </div>
          <div className="inProgress-dash">
            <div className="list-dash graphDash">
              <strong>Graph Days</strong>
              <div>Graph</div>
            </div>
          </div>
          <div className="done-dash">
            <div className="list-dash graphDash">
              <strong>Graph Tasks</strong>
              <div>Graph</div>
            </div>
          </div>
        </div>
        <div className="tasks-dash cardsRapport">
          <div className="done-dash">
            <span className="dashTask-title">Tasks Done</span>
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
                        <p style={{ fontSize: 12 }}>Created: {res.timestamp}</p>
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
            <span className="dashTask-title">Task that required more time</span>
            <div className="list-dash">
              {finishedDatas !== [] ? (
                totalAllCArdsTimeSeconds
                  .filter((res) => res.totalTime !== 0)
                  .map((res) => (
                    <ul key={uuidv4()}>
                      <li>
                        <p>{res.cardId}</p>
                        <p style={{ fontSize: 11 }}>{res.totalTime}</p>
                      </li>
                    </ul>
                  ))
              ) : (
                <strong style={{ color: "darkred", fontWeight: "bold" }}>
                  No tasks in this section
                </strong>
              )}
            </div>
          </div>
          <div className="inProgress-dash">
            <span className="dashTask-title">Task that required less time</span>
            <div className="list-dash">
              {stockItemsByStatus["In Progress"].length > 0 ? (
                stockItemsByStatus["In Progress"].map((res, i) => (
                  <ul key={uuidv4()}>
                    <li>
                      <p style={{ fontSize: 11 }}>{res.title}</p>
                    </li>
                  </ul>
                ))
              ) : (
                <strong style={{ color: "darkred", fontWeight: "bold" }}>
                  No tasks in this section
                </strong>
              )}
            </div>
          </div>
        </div>
        <div className="tasks-dash bottomSection">
          <div className="todo-dash">
            <span className="dashTask-title">Sticky Notes</span>
            <div className="list-dash stickyNotes">
              <div className="stickyListNote">
                <span>Sticky Note:</span>
                <span>Content Note</span>
              </div>
              <div className="stickyListNote">
                <span>Sticky Note:</span>
                <span>Content Note</span>
              </div>
              <div className="stickyListNote">
                <span>Sticky Note:</span>
                <span>Content Note</span>
              </div>
            </div>
          </div>
          <div className="inProgress-dash">
            <span className="dashTask-title">Number working sessions</span>
            <div className="list-dash stickyNotes">
              <div className="stickyListNote">
                <span>Working session:</span>
                <span>Time elapsed</span>
              </div>
              <div className="stickyListNote">
                <span>Working session:</span>
                <span>Time elapsed</span>
              </div>
              <div className="stickyListNote">
                <span>Working session:</span>
                <span>Time elapsed</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-dash">
          <span className="dashTask-title">Time Elapsed For each Task</span>
          <div className="list-dash bottom">
            {completCardsTimeArray
              .filter((resFiltered) => resFiltered.start !== "")
              .map((res) => (
                <div key={uuidv4()}>
                  <p>{res.cardTitle}</p>
                  <hr />
                  <p>Start: {res.start}</p>
                  <p>Stop: {res.stop}</p>
                  <hr />
                </div>
              ))}
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
