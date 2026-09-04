import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("main");

db.execSync(`
    PRAGMA journal_mode = DELETE;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    initValue REAL NOT NULL DEFAULT 0,
    balance REAL NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    initValue REAL NOT NULL DEFAULT 0,
    balance REAL NOT NULL DEFAULT 0,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'joint'))
);

-- 3. Records Table
CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    amount REAL NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
    fromId TEXT NOT NULL,
    toId TEXT NOT NULL,
    time INTEGER NOT NULL,
    note TEXT
);

CREATE INDEX IF NOT EXISTS idx_records_time ON records (time DESC);
CREATE INDEX IF NOT EXISTS idx_records_fromId ON records (fromId);
CREATE INDEX IF NOT EXISTS idx_records_toId ON records (toId);
CREATE INDEX IF NOT EXISTS idx_records_type ON records (type);`);

export default db;
// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
// `runAsync()` is useful when you want to execute some write operations.
// `getFirstAsync()` is useful when you want to get a single row from the database.
// `getAllAsync()` is useful when you want to get all results as an array of objects.row.value, row.intValue);
// `getEachAsync()` is useful when you want to iterate SQLite query cursor.
