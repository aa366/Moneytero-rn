import { RecordType } from "@/types";
import db from "./db";

type RecordRow = {
  id: string;
  amount: number;
  type: RecordType["type"];
  fromId: string;
  toId: string;
  time: number;
  note: string | null;
};

function mapRecord(row: RecordRow): RecordType {
  return {
    id: row.id,
    amount: row.amount,
    type: row.type,
    fromId: row.fromId,
    toId: row.toId,
    time: row.time,
    note: row.note ?? "",
  };
}

export async function getAllRecords() {
  const records = await db.getAllAsync<RecordRow>(`
    SELECT
      id,
      amount,
      type,
      fromId,
      toId,
      time,
      note
    FROM records
    ORDER BY time DESC
  `);

  return records.map(mapRecord);
}

export async function getRecordById(id: string) {
  const record = await db.getFirstAsync<RecordRow>(
    `
    SELECT
      id,
      amount,
      type,
      fromId,
      toId,
      time,
      note
    FROM records
    WHERE id = ?
  `,
    [id],
  );

  return record ? mapRecord(record) : null;
}

export async function createRecord(record: RecordType) {
  await db.runAsync(
    `
      INSERT INTO records (id, amount, type, fromId, toId, time, note)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      record.id,
      record.amount,
      record.type,
      record.fromId,
      record.toId,
      record.time,
      record.note ?? "",
    ],
  );

  return record;
}

export async function updateRecord(record: RecordType) {
  await db.runAsync(
    `
      UPDATE records
      SET amount = ?,
          type = ?,
          fromId = ?,
          toId = ?,
          time = ?,
          note = ?
      WHERE id = ?
    `,
    [
      record.amount,
      record.type,
      record.fromId,
      record.toId,
      record.time,
      record.note ?? "",
      record.id,
    ],
  );

  return record;
}

export async function deleteRecord(id: string) {
  await db.runAsync(
    `
      DELETE FROM records
      WHERE id = ?
    `,
    [id],
  );

  return true;
}
