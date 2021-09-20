import { useRecoilState } from "recoil";
import automaticTrackTimerAtom from "../../statesManager/atoms/automaticTrackTimerAtom";
import openDashAtom from "../../statesManager/atoms/openDashAtom";

const Dashboard = () => {
  const [autoTrackTime] = useRecoilState(automaticTrackTimerAtom);
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);
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
            <p>00H00m00s</p>
          </div>
          <div className="dashContainer-content-header">
            <strong>Total days work:</strong> <p>165 days</p>
          </div>
          <div className="dashContainer-content-header">
            <strong> Number Tasks:</strong> <p>25 Tasks</p>
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
        <div className="tasks-dash">
          <div className="todo-dash">
            <span className="dashTask-title">Task In To Do</span>
            <div className="list-dash">
              <ul>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
              </ul>
            </div>
          </div>
          <div className="inProgress-dash">
            <span className="dashTask-title">Task In Progress</span>
            <div className="list-dash">
              <ul>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
              </ul>
            </div>
          </div>
          <div className="done-dash">
            <span className="dashTask-title">Task In Done</span>
            <div className="list-dash">
              <ul>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
                <li>Task 1</li>
              </ul>
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
