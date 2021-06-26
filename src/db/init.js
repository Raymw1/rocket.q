const Database = require("./config");
const initDb = {
    async init() {
        const db = await Database();
        await db.exec(`CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER NOT NULL, password TEXT NOT NULL, PRIMARY KEY (id)
        );`);
        await db.exec(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, read INTEGER NOT NULL, 
            room_id INTEGER NOT NULL, FOREIGN KEY (room_id) REFERENCES rooms(id)
        );`)
        await db.close();
    }
}

initDb.init();