import { openDatabase } from "expo-sqlite"

const db = openDatabase("symposium-feat.db")

export async function createTable() {
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS Symposium (sid INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, startDate TEXT, host TEXT, topic TEXT)"
        )
    })
}

export async function getAll() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM Symposium",
                [],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            )
        })
    })
}

export async function insert(item) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Symposium (title, startDate, host, topic) VALUES (?, ?, ?, ?)",
                [item.title, item.startDate, item.host, item.topic],
                (_, { rows: { _array } }) => resolve(_array),
                (_, error) => reject(error)
            )
        })
    })
}