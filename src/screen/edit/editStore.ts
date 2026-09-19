import { EMPTY_RECORD } from "@/constants/empty";
import { RecordType } from "@/types";
import { create } from "zustand";

type AccountRefreshState = {
  record: RecordType;
  setRecord: (t: RecordType) => void;
};

export const useEdit = create<AccountRefreshState>((set) => ({
  record: { ...EMPTY_RECORD, time: Date.now() },
  setRecord: (newRecord: RecordType) =>
    set(() => ({
      record: { ...newRecord },
    })),
}));
