import { useRecoilState } from "recoil";
import openDashAtom from "../../statesManager/atoms/openDashAtom";

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);
  return (
    <div className="dash-content scale-in-ver-bottom">
      <div className="header-dash">
        <h1>Dashboard</h1>
        <button onClick={() => setOpenDash(false)}>Close</button>
      </div>
      <div className="dashContent-container">
        <div className="dashContainer-header">
          <div className="dashContainer-content-header">Content</div>
          <div className="dashContainer-content-header">Content</div>
          <div className="dashContainer-content-header">Content</div>
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
      </div>
    </div>
  );
};

export default Dashboard;
