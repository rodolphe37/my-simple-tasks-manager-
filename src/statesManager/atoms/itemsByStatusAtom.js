import { atom } from "recoil";

const itemsByStautsAtom = atom({
  key: "itemsByStautsState",
  default: [],
});

export default itemsByStautsAtom;
