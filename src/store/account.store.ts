import { mockAccounts } from "@/constants/mock-data";
import { AccountType } from "@/types";
import { create } from "zustand";

export const EMPTY_Account: AccountType = {
  type: "account",
  id: "",
  icon: "",
  name: "",
  initValue: 0,
  balance: 0,
  records: [],
};

export const normalizeAccount = (data?: Partial<AccountType>): AccountType => ({
  type: data?.type ?? "account",
  id: data?.id ?? "",
  icon: data?.icon ?? "",
  name: data?.name ?? "",
  initValue: data?.initValue ?? 0,
  balance: data?.balance ?? 0,
  records: data?.records ?? [],
});

export interface StoreType {
  accounts: AccountType[];
  current: AccountType;
  updateCurrent: (data: AccountType | Partial<AccountType>) => void;
  addAccount: (data: AccountType | Partial<AccountType>) => void;
  updateAccount: (data: AccountType | Partial<AccountType>) => void;
  removeAccount: (id: string) => void;
}

export const useAccountStore = create<StoreType>()((set) => ({
  accounts: mockAccounts,
  current: EMPTY_Account,
  updateCurrent: (data) =>
    set((state) => ({
      current: normalizeAccount({ ...state.current, ...data }),
    })),
  addAccount: (data) =>
    set((state) => {
      const newAccount = normalizeAccount(data);
      const newAccounts = [...state.accounts, newAccount];
      return { accounts: newAccounts };
    }),
  updateAccount: (data) =>
    set((state) => {
      const normalized = normalizeAccount(data);
      const newAccount = state.accounts.map((account) =>
        account.id === normalized.id ? { ...normalized } : account,
      );
      return { accounts: newAccount };
    }),
  removeAccount: (id) =>
    set((state) => {
      const newAccount = state.accounts.filter((data) => data.id != id);
      return { accounts: newAccount };
    }),
}));
