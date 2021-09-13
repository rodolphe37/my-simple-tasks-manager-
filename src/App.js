import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Taskboard from "./components/tasksBoard/TasksBoard";
import TimeTracker from "./components/timeTracker/TimeTracker";
import ok from "./components/assets/ok.svg";
import supp from "./components/assets/supp.svg";
import BacklogImg from "./components/assets/backlog.svg";
import Alert from "./components/alertComponent/customAlert/Alert";
import PwaLogo from "./components/assets/pwa-pass-3.svg";

const StyledLayout = styled(Layout)`
  /* We can't use "height: 100vh; width: 100vw;" here.
  Otherwise, when there is a horizontal scrollbar etc,
  because that we set a constant height, there will be a vertical one too.  */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background-color: #fff;
`;

const StyledContent = styled(Content)`
  background-color: rgba(236, 236, 236, 0.67);
`;

function App() {
  const [projectName, setProjectName] = useState(
    localStorage.getItem("projectName") ?? ""
  );
  const [validateprojectName, setValidateProjectName] = useState(
    localStorage.getItem("validate") ?? false
  );

  const [erasedDemand, setErasedDemand] = useState(false);

  useEffect(() => {
    if (projectName !== "" && validateprojectName) {
      setValidateProjectName(true);
    }
  }, [projectName, validateprojectName]);

  const handleValidateprojectName = () => {
    setValidateProjectName(true);
    localStorage.setItem("validate", true);
    localStorage.setItem("projectName", projectName);
  };

  const handleEraseprojectName = () => {
    setErasedDemand(true);
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <div className="projectName-container">
          {erasedDemand ? (
            <Alert
              setValidateProjectName={setValidateProjectName}
              setProjectName={setProjectName}
              title={`Delete or reset?`}
              subTitle={`You can delete the project name only, or reset the whole app...`}
              buttonYes={`Project name`}
              buttonNo={`Reset all`}
            />
          ) : null}
          <div className="projectName-content">
            {projectName && (
              <Fragment>
                {!validateprojectName && (
                  <button
                    onClick={handleValidateprojectName}
                    className={
                      validateprojectName
                        ? "valid-projectName-button simple "
                        : "valid-projectName-button simple"
                    }
                  >
                    <img
                      style={{ opacity: 1 }}
                      className="projectName-icons"
                      src={ok}
                      alt="ok"
                    />
                  </button>
                )}
                {validateprojectName && (
                  <button
                    onClick={handleEraseprojectName}
                    className="erase-urername-button simple opacityfull"
                  >
                    <img className="projectName-icons" src={supp} alt="supp" />
                  </button>
                )}
              </Fragment>
            )}
            <input
              style={{ width: "100%" }}
              readOnly={validateprojectName ? true : false}
              type="text"
              autoComplete="off"
              maxLength="30"
              id="chat-name-input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className={
                !validateprojectName
                  ? "new-message-input-field light-background opacityFilter"
                  : "new-message-input-field light-background"
              }
            />
          </div>
          <div className="logoApp">
            <img className="logo" src={BacklogImg} alt="" />
            <strong>My Simple Tasks manager</strong>
          </div>
          <div className="ribbon ribbon-top-right">
            <span>
              <img className="picture-ribbon" src={PwaLogo} alt="ribbon" />
            </span>
          </div>
        </div>
      </StyledHeader>
      <TimeTracker />
      <StyledContent>
        <Taskboard />
      </StyledContent>
    </StyledLayout>
  );
}

export default App;
