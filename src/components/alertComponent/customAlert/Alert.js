/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "./alert.css";
import "../checkboxAlert/checkbox-alert.css";
import BacklogImg from "../../assets/backlog.svg";

const Alert = ({
  title,
  subTitle,
  setValidateProjectName,
  setProjectName,
  confirmMessage,
  buttonYes,
  buttonNo,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [clickedAlert, setClickedAlert] = useState(false);

  function stepConfirm() {
    setProjectName("");
    localStorage.removeItem("projectName");
    localStorage.removeItem("validate");
    setValidateProjectName(false);
    setClickedAlert(false);
    window.location.reload();
  }

  const deteleAll = () => {
    setProjectName("");
    localStorage.removeItem("projectName");
    localStorage.removeItem("validate");
    setValidateProjectName(false);
    setClickedAlert(false);
    localStorage.removeItem("time");
    localStorage.removeItem("itemsByStatus");
    window.location.reload();
  };

  useEffect(() => {
    const confirmDialog = () => {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="react-confirm-alert-body">
              <div className="alert-content">
                <div className="logoAlert">
                  <img
                    style={{ width: 55, height: 55, marginRight: 12 }}
                    className="react-confirm-alert-img"
                    src={BacklogImg}
                    alt="logo"
                  />
                  <strong style={{ color: "#000" }}>
                    My Simple Tasks manager
                  </strong>
                </div>
                <h1
                  style={{ fontWeight: "bold", textAlign: "center" }}
                  className="titleAlert"
                >
                  {title}
                </h1>
              </div>
              <div className="subtitleAlert">
                <strong style={{ color: "#000", fontSize: 14, maxWidth: 250 }}>
                  {subTitle}
                </strong>
              </div>
              <p>{confirmMessage}</p>
              <div className="react-confirm-alert-button-group">
                {buttonYes ? (
                  <button
                    onClick={() => {
                      onClose();
                      stepConfirm();
                    }}
                  >
                    {buttonYes}
                  </button>
                ) : null}
                {buttonNo ? (
                  <button
                    onClick={() => {
                      setClickedAlert(false);
                      deteleAll();
                      onClose();
                    }}
                  >
                    {buttonNo}
                  </button>
                ) : null}
              </div>
            </div>
          );
        },
      });
    };
    confirmDialog();
  }, []);

  return <div className="container"></div>;
};
export default Alert;
