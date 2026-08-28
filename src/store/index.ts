import { RecordType } from "@/types";
import { create } from "zustand";

type State = {
  firstName: string;
  lastName: string;
};

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
};
export interface RecordTypeUpadate {
  updateRecord: (data: RecordType) => void;
}

export const useRecord = create<RecordType & RecordTypeUpadate>()((set) => ({
  id: "",
  amount: 0,
  from: {
    name: "",
    id: "",
  },
  to: {
    name: "",
    id: "",
  },
  time: "",
  note: "",
  updateRecord: ({ id, amount, from, to, time, note }) =>
    set(() => ({
      id,
      amount,
      from,
      to,
      time,
      note,
    })),
}));
