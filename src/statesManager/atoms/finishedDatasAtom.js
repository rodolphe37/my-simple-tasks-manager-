import { atom } from "recoil";

const finishedDatasAtom = atom({
  key: "finishedDatasState",
  default: [],
});

export default finishedDatasAtom;
