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
  time: timestamptz;
  note?: string;
}
export interface AccountType {
  id: string;
  icon?: string;
  name: string;
  initValue: number;
  balance: number;
  records: RecordType[];
}
export interface CategoryType {
  id: string;
  icon?: string;
  name: string;
  initValue: number;
  balance: number;
  records: RecordType[];
}
