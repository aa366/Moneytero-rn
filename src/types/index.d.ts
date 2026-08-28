export interface RecordType {
  id: string;
  amount: number;
  from: {
    name: string;
    id: string;
  };
  to: {
    name: string;
    id: string;
  };
  time: string;
  note?: string;
}
export interface AccountType {
  type: "account" | "category";
  id: string;
  icon: NAME;
  name: string;
  initValue: number;
  balance: number;
  records: RecordType[];
}
