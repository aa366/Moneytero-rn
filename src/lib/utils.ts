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
