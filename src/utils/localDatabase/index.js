import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const dbName = "mydb.db";

const init = async () => {
  try {
    const db = SQLite.openDatabase(dbName);

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS models (version TEXT NOT NULL, updated_time INTEGER NOT NULL);",
        [],
        (_, result) => {
          console.log("Table created successfully");
        },
        (_, error) => {
          console.log("Error creating table", error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS detectHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, prediction INTEGER, detect_time DATETIME)",
        [],
        (_, result) => {
          console.log("Table created successfully");
        },
        (_, error) => {
          console.log("Error creating table", error);
        }
      );
    });

    return db;
  } catch (error) {
    console.log(error);
  }
};

export default LocalDatabase = {
  init,
};
