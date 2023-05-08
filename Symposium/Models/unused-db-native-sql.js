import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';

const tableName = 'Symposium';

enablePromise(true);

export async function getDBConnection() {
  return openDatabase({ name: 'symposium-feat.db', location: 'default' });
};

export async function createTable(db) {
  return db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${tableName}
     (sid INTEGER PRIMARY KEY AUTOINCREMENT, 
      title TEXT, 
      startDate TEXT, 
      host TEXT,
      topic TEXT)`,
  );
};

export const getAll = async (db) => {
  return await db.executeSql(`SELECT * FROM ${tableName}`);
}

export const insert = async (db, item) => {
  return await db.executeSql(
    `INSERT INTO ${tableName} (title, startDate, host, topic) 
    VALUES (?, ?, ?, ?)`,
    [item.title, item.startDate, item.host, item.topic]);
}

export const deleteItem = async (db, item) => {
  return await db.executeSql(`Delete from ${tableName} where sid = ?`, [item.sid]);
}

export const dropTable = async (db) => {
  return await db.executeSql(`DROP TABLE ${tableName}`);
}