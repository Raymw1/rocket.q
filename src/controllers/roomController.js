const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const password = req.body.password;
        if (password.trim() === "" || !password) {
            return res.render("index", {page: "create-pass", roomId: -1, error: true, message: "Por favor, insira uma senha"});
        }
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
        let roomId = req.params.room;
        if (!await getRooms(db, roomId)) {
            return res.render("index", { page: "home", error: true, message: "Essa sala não existe", roomId: -1});
        }
        // console.log(roomId.match("/^[A-Za-z]+$/"));
        const questions = await db.all(`SELECT id, title, read FROM questions WHERE room_id = ${roomId} AND read = 0`);
        const questionRead = await db.all(`SELECT id, title, read FROM questions WHERE room_id = ${roomId} AND read = 1`);
        let isQuestions = questions.length + questionRead.length == 0 ? false : true
        return res.render("room", { roomId, questions, questionRead, isQuestions, error: false });
    },
    enter (req, res) {
        const roomInput = req.body.room_id;
        if (!roomInput) {
            return res.render("index", { page: "home", error: true, message: "Insira uma sala", roomId: -1});
        }
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
    return rooms.some(room => room.id == roomId);
}
