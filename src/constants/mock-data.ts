// import { AccountType, RecordType } from "@/types";

// export const mockAccounts: AccountType[] = [
//   // Asset Accounts
//   {
//     id: "acc_checking",
//     type: "account",
//     name: "Main Checking",
//     icon: "CircleEuro",
//     initValue: 5000,
//     balance: 6245.5,
//   },
//   {
//     id: "acc_savings",
//     type: "account",
//     name: "High-Yield Savings",
//     icon: "PiggyBank",
//     initValue: 12000,
//     balance: 12450.0,
//   },
//   {
//     id: "acc_joint",
//     type: "joint",
//     name: "Household Joint",
//     icon: "User",
//     initValue: 1500,
//     balance: 1850.25,
//   },

//   // Income Sources
//   {
//     id: "inc_salary",
//     type: "income",
//     name: "Tech Corp Salary",
//     icon: "Briefcase",
//     initValue: 0,
//     balance: 4200.0,
//   },
//   {
//     id: "inc_freelance",
//     type: "income",
//     name: "Freelance Design",
//     icon: "Laptop",
//     initValue: 0,
//     balance: 650.0,
//   },

//   // Expense Categories
//   {
//     id: "exp_groceries",
//     type: "expense",
//     name: "Groceries & Food",
//     icon: "ShoppingCart",
//     initValue: 0,
//     balance: 385.75,
//   },
//   {
//     id: "exp_housing",
//     type: "expense",
//     name: "Rent & Utilities",
//     icon: "House",
//     initValue: 0,
//     balance: 1450.0,
//   },
//   {
//     id: "exp_dining",
//     type: "expense",
//     name: "Dining Out & Coffee",
//     icon: "Coffee",
//     initValue: 0,
//     balance: 124.5,
//   },
// ];

// export const mockRecords: RecordType[] = [
//   {
//     id: "rec_001",
//     amount: 4200.0,
//     type: "income",
//     fromId: "inc_salary",
//     toId: "acc_checking",
//     time: 1773043200000, // Example timestamp
//     note: "March first bi-weekly paycheck",
//   },
//   {
//     id: "rec_002",
//     amount: 1450.0,
//     type: "expense",
//     fromId: "acc_checking",
//     toId: "exp_housing",
//     time: 1773129600000,
//     note: "Monthly apartment rent",
//   },
//   {
//     id: "rec_003",
//     amount: 500.0,
//     type: "transfer",
//     fromId: "acc_checking",
//     toId: "acc_savings",
//     time: 1773216000000,
//     note: "Scheduled autoIdmated savings",
//   },
//   {
//     id: "rec_004",
//     amount: 154.25,
//     type: "expense",
//     fromId: "acc_checking",
//     toId: "exp_groceries",
//     time: 1773302400000,
//     note: "Weekly market run",
//   },
//   {
//     id: "rec_005",
//     amount: 650.0,
//     type: "income",
//     fromId: "inc_freelance",
//     toId: "acc_checking",
//     time: 1773388800000,
//     note: "Landing page UI project payout",
//   },
//   {
//     id: "rec_006",
//     amount: 300.0,
//     type: "transfer",
//     fromId: "acc_checking",
//     toId: "acc_joint",
//     time: 1773475200000,
//     note: "Contribution for monthly shared groceries",
//   },
//   {
//     id: "rec_007",
//     amount: 42.5,
//     type: "expense",
//     fromId: "acc_checking",
//     toId: "exp_dining",
//     time: 1773561600000,
//     note: "Dinner with coworkers",
//   },
// ];
