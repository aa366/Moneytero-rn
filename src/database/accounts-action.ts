import { AccountType } from "@/types";
import db from "./db";

type AccountRow = {
  id: string;
  type: AccountType["type"];
  icon: string;
  name: string;
  initValue: number;
  balance: number;
};

function mapAccount(row: AccountRow): AccountType {
  return {
    id: row.id,
    type: row.type,
    icon: row.icon,
    name: row.name,
    initValue: row.initValue,
    balance: row.balance,
  };
}

export async function getAllAccounts() {
  const accounts = await db.getAllAsync<AccountRow>(`
    SELECT
      id,
      type,
      icon,
      name,
      initValue,
      balance
    FROM accounts
    WHERE deleted = 0
    ORDER BY type, name ASC
  `);

  return accounts.map(mapAccount);
}
export async function getAllAccountsUnrestrected() {
  const accounts = await db.getAllAsync<AccountRow>(`
    SELECT
      id,
      type,
      icon,
      name,
      initValue,
      balance
    FROM accounts
    ORDER BY type, name ASC
  `);

  return accounts.map(mapAccount);
}

export async function getAccountById(id: string) {
  const account = await db.getFirstAsync<AccountRow>(
    `
      SELECT
        id,
        type,
        icon,
        name,
        initValue,
        balance
      FROM accounts
      WHERE id = ? AND deleted = 0
    `,
    [id],
  );

  return account ? mapAccount(account) : null;
}

export async function createAccount(account: AccountType) {
  await db.runAsync(
    `
      INSERT INTO accounts (id, type, icon, name, initValue, balance, deleted)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `,
    [
      account.id,
      account.type,
      account.icon,
      account.name,
      account.initValue,
      account.balance,
    ],
  );

  return account;
}

export async function updateAccount(account: AccountType) {
  await db.runAsync(
    `
      UPDATE accounts
      SET type = ?,
          icon = ?,
          name = ?,
          initValue = ?,
          balance = ?
      WHERE id = ?
    `,
    [
      account.type,
      account.icon,
      account.name,
      account.initValue,
      account.balance,
      account.id,
    ],
  );

  return account;
}

export async function deleteAccount(id: string) {
  await db.runAsync(
    `
      UPDATE accounts
      SET deleted = 1
      WHERE id = ?
    `,
    [id],
  );

  return true;
}
