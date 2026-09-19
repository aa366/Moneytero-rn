import { AccountType, RecordType } from "@/types";

export const EMPTY_RECORD: RecordType = {
  id: "",
  amount: 0,
  type: "income",
  fromId: "",
  toId: "",
  time: Date.now(),
  note: "",
};

export const EMPTY_ACCOUNT: AccountType = {
  type: "account",
  id: "",
  icon: "",
  name: "",
  initValue: 0,
  balance: 0,
};
