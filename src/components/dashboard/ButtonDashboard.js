import { useState } from "react";
import { useRecoilState } from "recoil";
import openDashAtom from "../../statesManager/atoms/openDashAtom";
import dashIcon from "../assets/dashboards.svg";
import "./dashboard.css";

const ButtonDashboard = () => {
  const [openDash, setOpenDash] = useRecoilState(openDashAtom);

  const handleOpenDash = () => {
    setOpenDash((openDash) => !openDash);
  };
  return (
    <div
      onClick={handleOpenDash}
      title="Dashboard"
      data-toggle="tooltip"
      data-placement="left"
      className="buttonDashboard"
    >
      <img src={dashIcon} alt="dashboard" />
    </div>
  );
};

export default ButtonDashboard;
