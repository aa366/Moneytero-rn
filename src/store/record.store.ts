import { mockRecords } from "@/constants/mock-data";
import { useAccountStore } from "@/store/account.store";
import { useCategoryStore } from "@/store/category.store";
import { RecordType } from "@/types";
import { create } from "zustand";

const syncBalancesFromRecords = () => {
  const accounts = useAccountStore.getState().accounts.map((account) => ({
    ...account,
    balance: account.initValue,
  }));
  const categories = useCategoryStore.getState().categories.map((category) => ({
    ...category,
    balance: category.initValue,
  }));

  const records = useRecord.getState().records;

  for (const record of records) {
    const amount = Number(record.amount || 0);

    const fromAccount = accounts.find(
      (account) => account.id === record.from?.id,
    );
    if (fromAccount) {
      fromAccount.balance -= amount;
    }

    const toAccount = accounts.find((account) => account.id === record.to?.id);
    if (toAccount) {
      toAccount.balance += amount;
    }

    const fromCategory = categories.find(
      (category) => category.id === record.from?.id,
    );
    if (fromCategory) {
      fromCategory.balance += amount;
    }

    const toCategory = categories.find(
      (category) => category.id === record.to?.id,
    );
    if (toCategory) {
      toCategory.balance -= amount;
    }
  }

  useAccountStore.setState({ accounts });
  useCategoryStore.setState({ categories });
};

export const EMPTY_RECORD: RecordType = {
  id: "",
  amount: 0,
  type: "income",
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
  type: data?.type ?? "income",
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
      current: normalizeRecord({
        ...state.current,
        ...data,
        from: { ...state.current.from, ...data.from },
        to: { ...state.current.to, ...data.to },
      }),
    })),
  addRecord: (data) =>
    set((state) => {
      const newRecord = normalizeRecord(data);
      const newRecords = [...state.records, newRecord];
      queueMicrotask(() => syncBalancesFromRecords());
      return { records: newRecords };
    }),
  updateRecord: (data) =>
    set((state) => {
      const normalized = normalizeRecord(data);
      const newRecords = state.records.map((record) =>
        record.id === normalized.id ? { ...normalized } : record,
      );
      queueMicrotask(() => syncBalancesFromRecords());
      return { records: newRecords };
    }),
  removeRecord: (id) =>
    set((state) => {
      const newRecords = state.records.filter((data) => data.id != id);
      queueMicrotask(() => syncBalancesFromRecords());
      return { records: newRecords };
    }),
}));
