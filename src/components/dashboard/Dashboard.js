import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import automaticTrackTimerAtom from "../../statesManager/atoms/automaticTrackTimerAtom";
import itemsByStautsAtom from "../../statesManager/atoms/itemsByStatusAtom";
import openDashAtom from "../../statesManager/atoms/openDashAtom";

const Dashboard = () => {
  const [autoTrackTime] = useRecoilState(automaticTrackTimerAtom);
  const [totalTimeLocalStore] = useState(localStorage.getItem("time"));
  const [stockItemsByStatus, setStockItemsByStatus] =
    useRecoilState(itemsByStautsAtom);
  // eslint-disable-next-line no-unused-vars
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);

  function cutDecimals(number, decimals) {
    return number.toLocaleString("fullwide", {
      maximumFractionDigits: decimals,
    });
  }

  useEffect(() => {
    console.log("stockItemsByStatus", stockItemsByStatus);
  }, [stockItemsByStatus]);
  return (
    <div
      className={
        autoTrackTime
          ? "dash-content scale-in-ver-bottom"
          : "dash-content scale-in-ver-top"
      }
    >
      <div className="header-dash">
        <h1>Dashboard</h1>
        <button onClick={() => setOpenDash(false)}>Close</button>
      </div>
      <div className="dashContent-container">
        <div className="dashContainer-header">
          <div className="dashContainer-content-header">
            <strong>Total Time:</strong>
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 3600, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>hours</sub>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong>Total days work:</strong>{" "}
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {cutDecimals(totalTimeLocalStore / 28800, 2)}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>days</sub>
            </p>
          </div>
          <div className="dashContainer-content-header">
            <strong> Number Tasks:</strong>{" "}
            <p style={{ fontWeight: "bold", fontSize: 25 }}>
              {stockItemsByStatus["To Do"].length +
                stockItemsByStatus["In Progress"].length +
                stockItemsByStatus["Done"].length}{" "}
              <sub style={{ fontSize: 11, fontStyle: "italic" }}>tasks</sub>
            </p>
          </div>
        </div>
        <div className="tasks-dash graphs">
          <div className="todo-dash">
            <div className="list-dash graphDash">
              <strong>Graph title</strong>
              <div>Graph</div>
            </div>
          </div>
          <div className="inProgress-dash">
            <div className="list-dash graphDash">
              <strong>Graph title</strong>
              <div>Graph</div>
            </div>
          </div>
          <div className="done-dash">
            <div className="list-dash graphDash">
              <strong>Graph title</strong>
              <div>Graph</div>
            </div>
          </div>
        </div>
        <div className="tasks-dash cardsRapport">
          <div className="todo-dash">
            <span className="dashTask-title">Task In To Do</span>
            <div className="list-dash">
              {stockItemsByStatus["To Do"].length > 0 ? (
                stockItemsByStatus["To Do"].map((res, i) => (
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
          <div className="inProgress-dash">
            <span className="dashTask-title">Task In Progress</span>
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
          <div className="done-dash">
            <span className="dashTask-title">Task In Done</span>
            <div className="list-dash">
              {stockItemsByStatus["Done"].length > 0 ? (
                stockItemsByStatus["Done"].map((res, i) => (
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
      </div>
    </div>
  );
};

export default Dashboard;
