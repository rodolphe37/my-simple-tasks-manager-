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
      <div>Content</div>
    </div>
  );
};

export default Dashboard;
