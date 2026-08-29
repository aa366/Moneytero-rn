import { mockRecords } from "@/constants/mock-data";
import { RecordType } from "@/types";
import { create } from "zustand";

export const EMPTY_RECORD: RecordType = {
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
};

export const normalizeRecord = (data?: Partial<RecordType>): RecordType => ({
  id: data?.id ?? "",
  amount: Number(data?.amount ?? 0),
  from: {
    name: data?.from?.name ?? "",
    id: data?.from?.id ?? "",
  },
  to: {
    name: data?.to?.name ?? "",
    id: data?.to?.id ?? "",
  },
  time: data?.time ?? "",
  note: data?.note ?? "",
});

export interface StoreType {
  records: RecordType[];
  current: RecordType;
  updateCurrent: (data: RecordType | Partial<RecordType>) => void;
  addRecord: (data: RecordType | Partial<RecordType>) => void;
  updateRecord: (data: RecordType | Partial<RecordType>) => void;
  removeRecord: (id: string) => void;
}

export const useRecord = create<StoreType>()((set) => ({
  records: mockRecords,
  current: EMPTY_RECORD,
  updateCurrent: (data) =>
    set((state) => ({
      current: normalizeRecord({ ...state.current, ...data, from: { ...state.current.from, ...data.from }, to: { ...state.current.to, ...data.to } }),
    })),
  addRecord: (data) =>
    set((state) => {
      const newRecord = normalizeRecord(data);
      const newRecords = [...state.records, newRecord];
      return { records: newRecords };
    }),
  updateRecord: (data) =>
    set((state) => {
      const normalized = normalizeRecord(data);
      const newRecords = state.records.map((record) =>
        record.id === normalized.id ? { ...normalized } : record,
      );
      return { records: newRecords };
    }),
  removeRecord: (id) =>
    set((state) => {
      const newRecords = state.records.filter((data) => data.id != id);
      return { records: newRecords };
    }),
}));
