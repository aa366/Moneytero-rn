import { RecordType } from "@/types";
import db from "./db";

type RecordRow = {
  id: string;
  amount: number;
  type: RecordType["type"];
  fromId: string;
  fromName: string | null;
  toId: string;
  toName: string | null;
  time: number;
  note: string | null;
};

function mapRecord(row: RecordRow): RecordType {
  return {
    id: row.id,
    amount: row.amount,
    type: row.type,
    from: { id: row.fromId, name: row.fromName ?? row.fromId },
    to: { id: row.toId, name: row.toName ?? row.toId },
    time: row.time,
    note: row.note ?? "",
  };
}

export async function getAllRecords() {
  const records = await db.getAllAsync<RecordRow>(`
    SELECT
      records.id,
      records.amount,
      records.type,
      records.fromId,
      COALESCE(from_account.name, from_category.name) AS fromName,
      records.toId,
      COALESCE(to_account.name, to_category.name) AS toName,
      records.time,
      records.note
    FROM records
    LEFT JOIN accounts AS from_account ON from_account.id = records.fromId
    LEFT JOIN categories AS from_category ON from_category.id = records.fromId
    LEFT JOIN accounts AS to_account ON to_account.id = records.toId
    LEFT JOIN categories AS to_category ON to_category.id = records.toId
    ORDER BY records.time DESC
  `);

  return records.map(mapRecord);
}
export async function getRecordById(id: string) {
  const record = await db.getFirstAsync<RecordRow>(`
    SELECT
      records.id,
      records.amount,
      records.type,
      records.fromId,
      COALESCE(from_account.name, from_category.name) AS fromName,
      records.toId,
      COALESCE(to_account.name, to_category.name) AS toName,
      records.time,
      records.note
    FROM records
    LEFT JOIN accounts AS from_account ON from_account.id = records.fromId
    LEFT JOIN categories AS from_category ON from_category.id = records.fromId
    LEFT JOIN accounts AS to_account ON to_account.id = records.toId
    LEFT JOIN categories AS to_category ON to_category.id = records.toId
    WHERE records.id = ?
  `, [id]);

  return record ? mapRecord(record) : null;
}
