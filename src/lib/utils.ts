import { mockAccounts, mockCategories } from "@/constants/mock-data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAccount(id: string) {
  const account = mockAccounts.filter((item) => (item.id === id ? item : null));
  if (account[0]) return account[0];

  const category = mockCategories.filter((item) =>
    item.id === id ? item : null,
  );
  if (category[0]) return category[0];
  return null;
}
