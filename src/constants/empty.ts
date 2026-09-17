import { RecordType } from "@/types";

export const EMPTY_RECORD: RecordType = {
  id: "",
  amount: 100,
  type: "income",
  fromId: "",
  toId: "",
  time: Date.now(),
  note: "",
};
