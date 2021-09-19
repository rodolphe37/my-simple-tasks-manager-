import { useEffect, useState } from "react";
import "./noteComponent.css";
import Erasericon from "../assets/eraser.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const NoteComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const [noteNumberToDisplay, setNoteNumberToDisplay] = useState(
    localStorage.getItem("noteNumberToDisplay") ?? 1
  );
  // eslint-disable-next-line no-unused-vars
  const [newNote1, setNewNote1] = useState(true);
  const [newNote2, setNewNote2] = useState(
    JSON.parse(localStorage.getItem("newNote2")) === true ? true : false
  );
  const [newNote3, setNewNote3] = useState(
    JSON.parse(localStorage.getItem("newNote3")) === true ? true : false
  );
  const [newNote4, setNewNote4] = useState(
    JSON.parse(localStorage.getItem("newNote4")) === true ? true : false
  );
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

  const MySwal = withReactContent(Swal);

  const handleCreateNote2 = () => {
    setNewNote2((newNote2) => !newNote2);
    setNoteNumberToDisplay(2);
    localStorage.setItem("newNote2", true);
  };
  const handleCreateNote3 = () => {
    setNewNote3((newNote3) => !newNote3);
    setNoteNumberToDisplay(3);
    localStorage.setItem("noteNumberToDisplay", noteNumberToDisplay);
    localStorage.setItem("newNote3", true);
  };
  const handleCreateNote4 = () => {
    setNewNote4((newNote4) => !newNote4);
    setNoteNumberToDisplay(4);
    localStorage.setItem("noteNumberToDisplay", noteNumberToDisplay);
    localStorage.setItem("newNote4", true);
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
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNewNote2(false);
        setNoteNumberToDisplay(noteNumberToDisplay - 1);
        localStorage.setItem("noteNumberToDisplay", noteNumberToDisplay);
        setValueNote2("");
        localStorage.removeItem("valueNote2");
        localStorage.setItem("newNote2", false);
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };
  const handleDeleteNote3 = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNewNote3(false);
        setNoteNumberToDisplay(noteNumberToDisplay - 1);
        localStorage.setItem("noteNumberToDisplay", noteNumberToDisplay);
        setValueNote3("");
        localStorage.removeItem("valueNote3");
        localStorage.setItem("newNote3", false);
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };
  const handleDeleteNote4 = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setNewNote4(false);
        setNoteNumberToDisplay(noteNumberToDisplay - 1);
        localStorage.setItem("noteNumberToDisplay", noteNumberToDisplay);
        setValueNote4("");
        localStorage.removeItem("valueNote4");
        localStorage.setItem("newNote4", false);
        MySwal.fire("Deleted!", "Your note has been deleted.", "success");
      }
    });
  };
  const handleEraseNoteOne = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setValueNote1("");
        localStorage.removeItem("valueNote1");
        MySwal.fire("Erased!", "Your note has been erased.", "success");
      }
    });
  };

  // const NoteNumberFromLocalStore = localStorage.getItem("noteNumberToDisplay");

  useEffect(() => {
    if (newNote1 && newNote2 && newNote3 && newNote4) {
      setCreateButtonState(false);
    }
    // if (NoteNumberFromLocalStore === 1) {
    //   setNoteNumberToDisplay(2);
    // }
    if (newNote1 && newNote2 && newNote3 && newNote4) {
      setNoteNumberToDisplay(4);
    }
    if (newNote1 && !newNote2 && !newNote3 && !newNote4) {
      setCreateButtonState(true);
      setNoteNumberToDisplay(1);
      localStorage.setItem("noteNumberToDisplay", 1);
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

    // console.log("noteNumberToDisplay", noteNumberToDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueNote1, valueNote2, valueNote3, valueNote4, noteNumberToDisplay]);

  return (
    <div style={{ display: "flex", marginTop: 7 }}>
      <button
        style={{ position: "relative", zIndex: 5 }}
        disabled={createButtonState ? false : true}
        className={createButtonState ? "" : "opacity"}
        onClick={handleCreateNotes}
        id="create"
      >
        +
        <sub
          style={{
            fontSize: 22,
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 65,
            zIndex: 99,
            height: 16,
          }}
        >
          {noteNumberToDisplay}/4
        </sub>
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
          {valueNote1 ? (
            <button
              style={{ marginRight: 2 }}
              onClick={handleEraseNoteOne}
              className="button remove noColor"
            >
              <span className="infoEraser">
                <img
                  style={{ width: 24, marginLeft: -2, marginTop: -2 }}
                  src={Erasericon}
                  alt="eraser"
                />
                <span className="tooltip tooltipEraser">Erase content</span>
              </span>
            </button>
          ) : null}

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
