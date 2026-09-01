import { EditType } from "@/app/Edit";
import { useAccountStore } from "@/store/account.store";
import { useCategoryStore } from "@/store/category.store";
import { useRecord } from "@/store/record.store";
import { AccountType } from "@/types";

const recordStore = useRecord();
const accountStore = useAccountStore();
const CategoriesStore = useCategoryStore();

export function checkTransactionType(
  fromAccount: AccountType,
  toAccount: AccountType,
): EditType {
  if (fromAccount.type === "category") {
    return "income";
  } else if (toAccount.type === "category") {
    return "expense";
  }
  return "transfer";
}

export function getAccount(id: string) {
  const account = accountStore.accounts.find((item) => item.id === id);

  if (account) return account;

  const category = CategoriesStore.categories.find((item) => item.id === id);
  if (category) return category;

  return null;
}

export function formatDate(date: Date) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return formatted;
}
export function formatTime(date: Date) {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    dayPeriod: "long",
  }).format(date);
  return formatted;
}
