const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const password = req.body.password;
        let isRoom = true;
        let roomId;
        while (isRoom) {
            roomId = await generateRoomId();
            isRoom = await getRooms(db, roomId);
            if (!isRoom) {
                await db.run(`INSERT INTO rooms (id, password) VALUES (${roomId}, "${password}");`);
            }
        }
        // await db.close();
        res.redirect(`room/${roomId}`)
    }
}

async function generateRoomId() {
    var roomId = "";
    for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
    }
    return Number(roomId);
}

async function getRooms(db, roomId) {
    // roomId = 520664;
    let rooms = await db.all(`SELECT id FROM rooms;`);    // ALL!!!       NOT RUN!!!!
    // rooms.forEach(room => {
        //     if (roomId == room.id) {
            //         return 0
            //     }
            // });
    return rooms.some(room => room.id === roomId);
}
