export interface RecordType {
  id: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  from: {
    name: string;
    id: string;
  };
  to: {
    name: string;
    id: string;
  };
  time: number | string;
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
