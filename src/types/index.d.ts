export interface RecordType {
  id: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  fromId: string;
  toId: string;
  time: number;
  note?: string;
}
export interface AccountType {
  type: "account" | "income" | "expense" | "joint";
  id: string;
  icon: string;
  name: string;
  initValue: number;
  balance: number;
  deleted?: boolean;
}
