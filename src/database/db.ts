import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("test");

db.execSync(`
    PRAGMA journal_mode = DELETE;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('account', 'income', 'expense', 'joint')),
      icon TEXT NOT NULL,
      name TEXT NOT NULL,
      initValue REAL NOT NULL DEFAULT 0.0,
      balance REAL NOT NULL DEFAULT 0.0,
      deleted INTEGER NOT NULL DEFAULT 0
    );

CREATE TABLE IF NOT EXISTS records (
      id TEXT PRIMARY KEY NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('income', 'expense', 'transfer')),
      fromId TEXT NOT NULL,
      toId TEXT NOT NULL,
      time INTEGER NOT NULL,
      note TEXT,
      FOREIGN KEY (fromId) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE RESTRICT,
      FOREIGN KEY (toId) REFERENCES accounts (id) ON UPDATE CASCADE ON DELETE RESTRICT
    );

CREATE INDEX IF NOT EXISTS idx_records_time ON records (time DESC);
    CREATE INDEX IF NOT EXISTS idx_records_fromId ON records (fromId);
    CREATE INDEX IF NOT EXISTS idx_records_toId ON records (toId);
    CREATE INDEX IF NOT EXISTS idx_records_type ON records (type);
    CREATE INDEX IF NOT EXISTS idx_accounts_type ON accounts (type);

CREATE TRIGGER IF NOT EXISTS trg_records_after_insert
AFTER INSERT ON records
BEGIN
    UPDATE accounts
    SET balance = balance - NEW.amount
    WHERE id = NEW.fromId;

    UPDATE accounts
    SET balance = balance + NEW.amount
    WHERE id = NEW.toId;
END;

CREATE TRIGGER IF NOT EXISTS trg_records_after_update
AFTER UPDATE ON records
BEGIN
    UPDATE accounts
    SET balance = balance + OLD.amount
    WHERE id = OLD.fromId;

    UPDATE accounts
    SET balance = balance - OLD.amount
    WHERE id = OLD.toId;

    UPDATE accounts
    SET balance = balance - NEW.amount
    WHERE id = NEW.fromId;

    UPDATE accounts
    SET balance = balance + NEW.amount
    WHERE id = NEW.toId;
END;

CREATE TRIGGER IF NOT EXISTS trg_records_after_delete
AFTER DELETE ON records
BEGIN
    UPDATE accounts
    SET balance = balance + OLD.amount
    WHERE id = OLD.fromId;

    UPDATE accounts
    SET balance = balance - OLD.amount
    WHERE id = OLD.toId;
END;
    `);

// Seed default data on first app launch.
// These are the app's initial account/category rows and won't duplicate if they already exist.
db.runSync(`
    INSERT OR IGNORE INTO accounts (id, type, icon, name, initValue, balance, deleted) VALUES
      ('acc_cash', 'account', 'Wallet', 'Cash', 0, 500.0, 0),
      ('acc_savings', 'account', 'PiggyBank', 'Savings', 0, 15000.0, 0),
      ('acc_card', 'account', 'CreditCard', 'Card', 0, 0.0, 0),
      ('acc_social', 'account', 'Users', 'Social', 0, 1200.0, 0),
      ('acc_joint_social', 'joint', 'Handshake', 'Joint Social', 0, 800.0, 0),
      ('inc_awards', 'income', 'Medal', 'Awards', 0, 0.0, 0),
      ('inc_grants', 'income', 'Gift', 'Grants', 0, 0.0, 0),
      ('inc_refunds', 'income', 'RefreshCw', 'Refunds', 0, 0.0, 0),
      ('inc_unknown', 'income', 'Ellipsis', 'Unknown', 0, 0.0, 0),
      ('inc_tax', 'income', 'ReceiptText', 'Tax', 0, 0.0, 0),
      ('inc_salary', 'income', 'Briefcase', 'Salary', 0, 0.0, 0),
      ('exp_bill', 'expense', 'Receipt', 'Bill', 0, 0.0, 0),
      ('exp_clothing', 'expense', 'Shirt', 'Clothing', 0, 0.0, 0),
      ('exp_education', 'expense', 'GraduationCap', 'Education', 0, 0.0, 0),
      ('exp_food', 'expense', 'UtensilsCrossed', 'Food', 0, 0.0, 0),
      ('exp_health', 'expense', 'HeartPulse', 'Health', 0, 0.0, 0),
      ('exp_home', 'expense', 'House', 'Home', 0, 0.0, 0),
      ('exp_insurance', 'expense', 'Shield', 'Insurance', 0, 0.0, 0),
      ('exp_transportation', 'expense', 'CarFront', 'Transportation', 0, 0.0, 0),
      ('exp_telephone', 'expense', 'Phone', 'Telephone', 0, 0.0, 0),
      ('exp_miscellaneous', 'expense', 'Ellipsis', 'Unknown', 0, 0.0, 0);
`);
// add records here
const today = new Date();
const dayStart = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
).getTime();

db.runSync(
  `INSERT OR IGNORE INTO records (id, amount, type, fromId, toId, time, note) VALUES
    ('rec_salary_01', 3500, 'income', 'inc_salary', 'acc_cash', ${dayStart + 8 * 60 * 60 * 1000}, 'Monthly salary'),
    ('rec_bonus_02', 600, 'income', 'inc_awards', 'acc_savings', ${dayStart + 9 * 60 * 60 * 1000}, 'Performance bonus'),
    ('rec_grant_03', 1500, 'income', 'inc_grants', 'acc_joint_social', ${dayStart + 9 * 60 * 60 * 1000 + 15 * 60 * 1000}, 'Community grant'),
    ('rec_refund_04', 220, 'income', 'inc_refunds', 'acc_card', ${dayStart + 11 * 60 * 60 * 1000}, 'Order refund'),
    ('rec_tax_05', 180, 'income', 'inc_tax', 'acc_social', ${dayStart + 13 * 60 * 60 * 1000}, 'Tax return'),
    ('rec_unknown_income_06', 90, 'income', 'inc_unknown', 'acc_cash', ${dayStart + 13 * 60 * 60 * 1000 + 30 * 60 * 1000}, 'Unknown income'),
    ('rec_food_07', 85, 'expense', 'acc_cash', 'exp_food', ${dayStart + 8 * 60 * 60 * 1000 + 45 * 60 * 1000}, 'Groceries'),
    ('rec_home_08', 1200, 'expense', 'acc_cash', 'exp_home', ${dayStart + 9 * 60 * 60 * 1000 + 20 * 60 * 1000}, 'Rent payment'),
    ('rec_transport_09', 120, 'expense', 'acc_cash', 'exp_transportation', ${dayStart + 10 * 60 * 60 * 1000}, 'Fuel'),
    ('rec_phone_10', 75, 'expense', 'acc_card', 'exp_telephone', ${dayStart + 10 * 60 * 60 * 1000 + 30 * 60 * 1000}, 'Phone bill'),
    ('rec_health_11', 150, 'expense', 'acc_savings', 'exp_health', ${dayStart + 11 * 60 * 60 * 1000}, 'Pharmacy'),
    ('rec_clothing_12', 95, 'expense', 'acc_card', 'exp_clothing', ${dayStart + 12 * 60 * 60 * 1000}, 'New clothes'),
    ('rec_education_13', 200, 'expense', 'acc_cash', 'exp_education', ${dayStart + 12 * 60 * 60 * 1000 + 45 * 60 * 1000}, 'Course fee'),
    ('rec_insurance_14', 180, 'expense', 'acc_savings', 'exp_insurance', ${dayStart + 14 * 60 * 60 * 1000}, 'Insurance premium'),
    ('rec_bill_15', 430, 'expense', 'acc_cash', 'exp_bill', ${dayStart + 15 * 60 * 60 * 1000}, 'Electricity bill'),
    ('rec_misc_16', 60, 'expense', 'acc_social', 'exp_miscellaneous', ${dayStart + 15 * 60 * 60 * 1000 + 20 * 60 * 1000}, 'Unexpected expense'),
    ('rec_transfer_17', 400, 'transfer', 'acc_cash', 'acc_savings', ${dayStart + 16 * 60 * 60 * 1000}, 'Transfer to savings'),
    ('rec_transfer_18', 250, 'transfer', 'acc_joint_social', 'acc_social', ${dayStart + 17 * 60 * 60 * 1000}, 'Split shared expenses'),
    ('rec_transfer_19', 150, 'transfer', 'acc_card', 'acc_cash', ${dayStart + 17 * 60 * 60 * 1000 + 25 * 60 * 1000}, 'Card payout'),
    ('rec_transfer_20', 320, 'transfer', 'acc_savings', 'acc_cash', ${dayStart + 18 * 60 * 60 * 1000}, 'Emergency cash pull');`,
);
export default db;
// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
// `runAsync()` is useful when you want to execute some write operations.
// `getFirstAsync()` is useful when you want to get a single row from the database.
// `getAllAsync()` is useful when you want to get all results as an array of objects.row.value, row.intValue);
// `getEachAsync()` is useful when you want to iterate SQLite query cursor.
