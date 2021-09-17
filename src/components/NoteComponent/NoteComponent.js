import { useEffect, useState } from "react";
import "./noteComponent.css";
import Erasericon from "../assets/eraser.svg";

const NoteComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const [newNote1, setNewNote1] = useState(true);
  const [newNote2, setNewNote2] = useState(false);
  const [newNote3, setNewNote3] = useState(false);
  const [newNote4, setNewNote4] = useState(false);
  const [createButtonState, setCreateButtonState] = useState(true);
  const [valueNote1, setValueNote1] = useState(
    localStorage.getItem("valueNote1") ?? ""
  );
  const [valueNote2, setValueNote2] = useState(
    localStorage.getItem("valueNote2") ?? ""
  );
  const [valueNote3, setValueNote3] = useState(
    localStorage.getItem("valueNote3") ?? ""
  );
  const [valueNote4, setValueNote4] = useState(
    localStorage.getItem("valueNote4") ?? ""
  );

  const handleCreateNote2 = () => {
    setNewNote2((newNote2) => !newNote2);
    localStorage.setItem("newNote2", newNote2);
  };
  const handleCreateNote3 = () => {
    setNewNote3((newNote3) => !newNote3);
    localStorage.setItem("newNote3", newNote3);
  };
  const handleCreateNote4 = () => {
    setNewNote4((newNote4) => !newNote4);
    localStorage.setItem("newNote4", newNote4);
  };

  const handleCreateNotes = () => {
    if (newNote1 && !newNote2 && !newNote3 && !newNote4) {
      handleCreateNote2();
    }
    if (newNote1 && newNote2 && !newNote3 && !newNote4) {
      handleCreateNote3();
    }
    if (newNote1 && newNote2 && newNote3 && !newNote4) {
      handleCreateNote4();
    }
  };

  const handleDeleteNote2 = () => {
    setNewNote2(false);
    setValueNote2("");
    localStorage.removeItem("valueNote2");
  };
  const handleDeleteNote3 = () => {
    setNewNote3(false);
    setValueNote3("");
    localStorage.removeItem("valueNote3");
  };
  const handleDeleteNote4 = () => {
    setNewNote4(false);
    setValueNote4("");
    localStorage.removeItem("valueNote4");
  };
  const handleEraseNoteOne = () => {
    setValueNote1("");
    localStorage.removeItem("valueNote1");
  };

  useEffect(() => {
    if (newNote1 && newNote2 && newNote3 && newNote4) {
      setCreateButtonState(false);
    }
    if (newNote1 && !newNote2 && !newNote3 && !newNote4) {
      setCreateButtonState(true);
    }
    if (valueNote1) {
      localStorage.setItem("valueNote1", valueNote1);
    }
    if (valueNote2) {
      localStorage.setItem("valueNote2", valueNote2);
    }
    if (valueNote3) {
      localStorage.setItem("valueNote3", valueNote3);
    }
    if (valueNote4) {
      localStorage.setItem("valueNote4", valueNote4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    newNote1,
    newNote2,
    newNote3,
    newNote4,
    valueNote1,
    valueNote2,
    valueNote3,
    valueNote4,
  ]);

  return (
    <div style={{ display: "flex", marginTop: 7 }}>
      <button
        disabled={createButtonState ? false : true}
        className={createButtonState ? "" : "opacity"}
        onClick={handleCreateNotes}
        id="create"
      >
        +
      </button>
      <div
        style={{
          position: "relative",
          // marginRight: "22px !important",
          maxWidth: 520,
          maxHeight: 250,
        }}
      >
        <div style={{ position: "relative" }}>
          <button
            style={{ marginRight: 2 }}
            onClick={handleEraseNoteOne}
            className="button remove noColor"
          >
            <img
              style={{ width: 24, marginLeft: -2, marginTop: -2 }}
              src={Erasericon}
              alt="eraser"
            />
          </button>
          <textarea
            value={valueNote1}
            onChange={(e) => setValueNote1(e.target.value)}
          ></textarea>
        </div>
      </div>
      {newNote2 ? (
        <div style={{ position: "relative" }}>
          <button onClick={handleDeleteNote2} className="button remove">
            X
          </button>
          <textarea
            value={valueNote2}
            onChange={(e) => setValueNote2(e.target.value)}
          ></textarea>
        </div>
      ) : null}
      {newNote3 ? (
        <div
          style={{
            position: "relative",
            // marginRight: "22px !important",
            maxWidth: 520,
            maxHeight: 250,
          }}
        >
          <button onClick={handleDeleteNote3} className="button remove">
            X
          </button>
          <textarea
            value={valueNote3}
            onChange={(e) => setValueNote3(e.target.value)}
          ></textarea>
        </div>
      ) : null}
      {newNote4 ? (
        <div
          style={{
            position: "relative",
            // marginRight: "22px !important",
            maxWidth: 520,
            maxHeight: 250,
          }}
        >
          <button onClick={handleDeleteNote4} className="button remove">
            X
          </button>
          <textarea
            value={valueNote4}
            onChange={(e) => setValueNote4(e.target.value)}
          ></textarea>
        </div>
      ) : null}
    </div>
  );
};

export default NoteComponent;
