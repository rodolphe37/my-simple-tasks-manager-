import { useState } from "react";
import { useRecoilState } from "recoil";
import openDashAtom from "../../statesManager/atoms/openDashAtom";
import projectDoneAtom from "../../statesManager/atoms/projectDoneAtom";
import dashIcon from "../assets/dashboards.svg";
import "./dashboard.css";

const ButtonDashboard = () => {
  const [projectDone] = useRecoilState(projectDoneAtom);
  // eslint-disable-next-line no-unused-vars
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);
  const [clickedOnDashButton, setClickedOnDashButton] = useState(
    localStorage.getItem("clickedOnDashButton") ?? false
  );

  const handleOpenDash = () => {
    setOpenDash((openDash) => !openDash);
    setClickedOnDashButton(true);
    localStorage.setItem("clickedOnDashButton", true);
  };

  // useEffect(() => {
  //   if (!clickedOnDashButton) {
  //     localStorage.setItem("clickedOnDashButton", false);
  //   }
  // }, [clickedOnDashButton]);
  return (
    <div
      onClick={handleOpenDash}
      title="Dashboard"
      data-toggle="tooltip"
      data-placement="left"
      className={
        projectDone && !clickedOnDashButton
          ? "buttonDashboard jello-horizontal"
          : "buttonDashboard"
      }
    >
      <img src={dashIcon} alt="dashboard" />
    </div>
  );
};

export default ButtonDashboard;
