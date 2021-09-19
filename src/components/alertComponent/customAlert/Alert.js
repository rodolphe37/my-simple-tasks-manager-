/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import "./alert.css";
import "../checkboxAlert/checkbox-alert.css";
import BacklogImg from "../../assets/backlog.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  const MySwal = withReactContent(Swal);

  function stepConfirm() {
    setProjectName("");
    localStorage.removeItem("projectName");
    localStorage.removeItem("validate");
    setValidateProjectName(false);
    setClickedAlert(false);
    window.location.reload();
  }

  const deteleAll = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Reinitialized!",
          "the Time Tracker is well reset.",
          "success"
        );
        setProjectName("");
        localStorage.clear();
        setValidateProjectName(false);
        setClickedAlert(false);

        window.location.reload();
      }
    });
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
