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
        await db.close();
        return res.redirect(`room/${roomId}`)
    },
    async open (req, res) {
        const db = await Database();
        roomId = req.params.room;
        const questions = await db.all(`SELECT id, title, read FROM questions WHERE room_id = ${roomId} AND read = 0`);
        const questionRead = await db.all(`SELECT id, title, read FROM questions WHERE room_id = ${roomId} AND read = 1`);
        let isQuestions = questions.length + questionRead.length == 0 ? false : true
        return res.render("room", { roomId, questions, questionRead, isQuestions });
    },
    enter (req, res) {
        const roomInput = req.body.room_id;
        return res.redirect(`/room/${roomInput}`);
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
