import { mockCategories } from "@/constants/mock-data";
import { AccountType } from "@/types";
import { create } from "zustand";

export const EMPTY_Category: AccountType = {
  type: "category",
  id: "",
  icon: "Wallet" as any,
  name: "",
  initValue: 0,
  balance: 0,
  records: [],
};

export const normalizeCategory = (
  data?: Partial<AccountType>,
): AccountType => ({
  type: data?.type ?? "category",
  id: data?.id ?? "",
  icon: (data?.icon ?? "Wallet") as any,
  name: data?.name ?? "",
  initValue: data?.initValue ?? 0,
  balance: data?.balance ?? 0,
  records: data?.records ?? [],
});

export interface CategoryStoreType {
  categories: AccountType[];
  current: AccountType;
  updateCurrent: (data: AccountType | Partial<AccountType>) => void;
  addCategory: (data: AccountType | Partial<AccountType>) => void;
  updateCategory: (data: AccountType | Partial<AccountType>) => void;
  removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStoreType>()((set) => ({
  categories: mockCategories,
  current: EMPTY_Category,
  updateCurrent: (data) =>
    set((state) => ({
      current: normalizeCategory({ ...state.current, ...data }),
    })),
  addCategory: (data) =>
    set((state) => {
      const newCategory = normalizeCategory(data);
      return { categories: [...state.categories, newCategory] };
    }),
  updateCategory: (data) =>
    set((state) => {
      const normalized = normalizeCategory(data);
      const nextCategories = state.categories.map((category) =>
        category.id === normalized.id ? { ...normalized } : category,
      );
      return { categories: nextCategories };
    }),
  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}));
