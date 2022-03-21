import { atom } from "recoil";

export const Blocks = atom({
  key: "Blocks",
  default: null,
});

export const Block = atom({
  key: "Block",
  default: null,
});

export const searchBlockID = atom({
  key: "searchBlockID",
  default: "",
});

export const markets = atom({
  key: "markets",
  default: [],
});

export const Txs = atom({
  key: "Txs",
  default: {},
});

export const Validators = atom({
  key: "Validators",
  default: [],
});

export const Party = atom({
  key: "Party",
  default: null,
});

export const Order = atom({
  key: "Order",
  default: null,
});

export const Trade = atom({
  key: "Trade",
  default: null,
});

export const Assets = atom({
  key: "Assets",
  default: null,
});

export const Asset = atom({
  key: "Asset",
  default: null,
});
