import { atom } from "recoil";

const activateDeleteConvAtom = atom({
  key: "activateDeleteConvState",
  default: true,
});

export default activateDeleteConvAtom;
