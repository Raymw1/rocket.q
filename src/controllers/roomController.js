const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const password = req.body.password;
        let roomId = generateRoomId();
        await db.run(`INSERT INTO rooms (id, password) VALUES (${roomId}, "${password}");`);
        
        res.redirect(`room/${roomId}`)
    }
}

function generateRoomId() {
    var roomId = "";
    for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
    }
    return Number(roomId);
}