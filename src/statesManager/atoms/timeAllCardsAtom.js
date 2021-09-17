import { atom } from "recoil";

const timeAllCardsAtom = atom({
  key: "timeAllCardsState",
  default:
    localStorage.getItem("completCardsTimeArray") !== null
      ? JSON.parse(localStorage.getItem("completCardsTimeArray"))
      : [],
});

export default timeAllCardsAtom;
