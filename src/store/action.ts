import { RecordType } from "@/types";
import { useRecord } from "./record.store";

// const accountStore = useAccountStore();
// const CategoryStore = useCategoryStore();

export function useAddRecord(newRecord: RecordType) {
  const recordStore = useRecord();
  recordStore.addRecord(newRecord);
}
export function useUpdateRecord(newRecord: RecordType) {
  const recordStore = useRecord();
  recordStore.updateRecord(newRecord);
}

export function useRemoveRecord(id: string) {
  const recordStore = useRecord();
  recordStore.removeRecord(id);
}
