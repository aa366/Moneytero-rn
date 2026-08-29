import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("main");
export default db;
// `execAsync()` is useful for bulk queries when you want to execute altogether.
// Note that `execAsync()` does not escape parameters and may lead to SQL injection.
// `runAsync()` is useful when you want to execute some write operations.
// `getFirstAsync()` is useful when you want to get a single row from the database.
// `getAllAsync()` is useful when you want to get all results as an array of objects.row.value, row.intValue);
// `getEachAsync()` is useful when you want to iterate SQLite query cursor.
