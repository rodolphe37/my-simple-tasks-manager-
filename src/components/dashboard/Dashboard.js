import { useEffect, useState } from "react";
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

const Dashboard = () => {
  const [itemsByStatus] = useRecoilState(itemsByStatusAtom);
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
  let totalEuro = eurTjm * 0.85;

  useEffect(() => {
    if (tjm) {
      localStorage.setItem("tjm", tjm);
      setEurTjm(tjm);
    } else if (tjm === 0) {
      localStorage.removeItem("tjm");
    }
    if (projectDone && tjm === 0) {
      return MySwal.fire({
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
          console.log(result);
          setTjm(result.value);
          Swal.fire("Saved!", "Your daily rate has been saved.", "success");
        }
      });
    }
    console.log(stockItemsByStatus);
  }, [tjm, setEurTjm, eurTjm, MySwal, projectDone, stockItemsByStatus]);

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
        console.log(result);
        setTjm(result.value);
        Swal.fire("Saved!", "Your daily rate has been saved.", "success");
      }
    });
  };

  const taskPerHour =
    stockItemsByStatus["To Do"].length +
    stockItemsByStatus["In Progress"].length +
    stockItemsByStatus["Done"].length;

  useEffect(() => {
    console.log("completCardsTimeArray", completCardsTimeArray);
    console.log("taskPerHour", taskPerHour);
    // if (tjm === 0) {
    //   localStorage.setItem("tjm", 0);
    // }
    console.log("finishedDatas", finishedDatas);
  }, [completCardsTimeArray, itemsByStatus, finishedDatas, taskPerHour]);

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
            <strong>X</strong>
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
            <p>${tjm}</p>
            <p>{tjm !== 0 ? totalEuro : 0}€</p>
          </span>
        </div>
        <div className="dashContainer-header">
          <div className="dashContainer-content-header">
            <strong>Total Time:</strong>
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 3600, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>hours</sub>
              <hr />
              <p>
                ${cutDecimals(tjm / 8, 2)} <sub>per hour</sub>
              </p>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong>Total days work:</strong>{" "}
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 28800, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>days</sub>
              <hr />
              <p>
                ${cutDecimals((tjm * totalTimeLocalStore) / 28800, 2)}{" "}
                <sub>total</sub>
              </p>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong> Number Tasks:</strong>{" "}
            {stockItemsByStatus && (
              <p style={{ fontWeight: "bold", fontSize: 25 }}>
                {stockItemsByStatus["To Do"].length +
                  stockItemsByStatus["In Progress"].length +
                  stockItemsByStatus["Done"].length}{" "}
                <sub style={{ fontSize: 11, fontStyle: "italic" }}>tasks</sub>
                <hr />
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>
                    {cutDecimals(totalTimeLocalStore / 3600 / taskPerHour, 2)}
                  </p>
                  <sub style={{ fontSize: 11 }}>hour/task</sub>
                </span>
              </p>
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
                    <ul key={res.id}>
                      <li>
                        <strong style={{ fontSize: 11 }}>
                          Name: {res.title}
                        </strong>
                        <p>{res.id}</p>
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
                totalAllCArdsTimeSeconds.map((res, i) => (
                  <ul key={i}>
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
                  <ul key={i}>
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
                <div key={res.cardId}>
                  <p>{res.cardTitle}</p>
                  <hr />
                  <p>{res.start}</p>
                  <hr />
                  <p>{res.stop}</p>
                </div>
              ))}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Dashboard;
