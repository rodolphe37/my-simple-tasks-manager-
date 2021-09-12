import { atom } from "recoil";

const clickedAlertAtom = atom({
  key: "clickedAlertState",
  default: false,
});

export default clickedAlertAtom;
