import { AccountType, RecordType } from "@/types";

export const mockRecords: RecordType[] = [
  {
    id: "rec_001",
    amount: 3200,
    from: {
      id: "cat_income_salary",
      name: "Tech Corp Inc.",
    },
    to: {
      id: "acc_checking_01",
      name: "Main Checking",
    },
    time: "2026-08-01T09:00:00Z",
    note: "Monthly Salary",
  },
  {
    id: "rec_002",
    amount: 120.5,
    from: {
      id: "acc_checking_01",
      name: "Main Checking",
    },
    to: {
      id: "cat_groceries",
      name: "Supermarket",
    },
    time: "2026-08-03T17:42:00Z",
    note: "Weekly grocery restock",
  },
  {
    id: "rec_003",
    amount: 14.99,
    from: {
      id: "acc_credit_01",
      name: "Sapphire Credit Card",
    },
    to: {
      id: "cat_entertainment",
      name: "Streaming Subscription",
    },
    time: "2026-08-05T12:00:00Z",
    note: "Monthly streaming service",
  },
  {
    id: "rec_004",
    amount: 500,
    from: {
      id: "acc_checking_01",
      name: "Main Checking",
    },
    to: {
      id: "acc_savings_01",
      name: "High-Yield Savings",
    },
    time: "2026-08-06T10:15:00Z",
    note: "Monthly savings transfer",
  },
];

export const mockAccounts: AccountType[] = [
  {
    type: "account",
    id: "acc_checking_01",
    icon: "Banknote",
    name: "Main Checking",
    initValue: 1000.0,
    balance: 3579.5, // 1000 (init) + 3200 (salary) - 120.50 (groceries) - 500 (savings)
    records: [mockRecords[0], mockRecords[1], mockRecords[3]],
  },
  {
    type: "account",
    id: "acc_savings_01",
    icon: "PiggyBank",
    name: "High-Yield Savings",
    initValue: 12500.0,
    balance: 13000.0, // 12500 (init) + 500 (transfer)
    records: [mockRecords[3]],
  },
  {
    type: "account",
    id: "acc_credit_01",
    icon: "CreditCard",
    name: "Sapphire Credit Card",
    initValue: 0.0,
    balance: -14.99,
    records: [mockRecords[2]],
  },
];

export const mockCategories: AccountType[] = [
  {
    type: "category",
    id: "cat_income_salary",
    icon: "Briefcase",
    name: "Salary & Wages",
    initValue: 0.0,
    balance: 3200.0,
    records: [mockRecords[0]],
  },
  {
    type: "category",
    id: "cat_groceries",
    icon: "ShoppingCart",
    name: "Groceries",
    initValue: 0.0,
    balance: 120.5,
    records: [mockRecords[1]],
  },
  {
    type: "category",
    id: "cat_entertainment",
    icon: "Tv",
    name: "Entertainment & Subs",
    initValue: 0.0,
    balance: 14.99,
    records: [mockRecords[2]],
  },
];
