const Database = require("../db/config");

module.exports = {
    async index(req, res) {
        const db = await Database();
        const roomId = req.params.room;
        const questionId = req.params.question;
        const action = req.params.action;
        const password = req.body.password;
        let roomPwd = await db.get(`SELECT * FROM rooms WHERE id = ${roomId};`);
        roomPwd = roomPwd.password;
        const verifyRoomPass = password == roomPwd;
        if (verifyRoomPass) {
            if (action == "delete") {
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`);
            }   else if (action == "check") {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`);
            }
            return res.redirect(`/room/${roomId}`)
        }   else {
            let isQuestions = false;
            let questions, questionRead = []
            return res.render("room", {questions, questionRead, isQuestions, error: true, message: "Senha incorreta", roomId});
            // return res.render("apology", {message: "Senha incorreta", roomId: true}) 
        }
        // console.log(roomId, questionId, action, password)
    },
    async create(req, res) {
        const question = req.body.question;
        const roomId = req.params.room;
        if (question.trim() === "" || !question) {
            let isQuestions = false;
            let questions, questionRead = []
            return res.render("room", {questions, questionRead, isQuestions, error: true, message: "Por favor, escreva algo", roomId});
        }
        const db = await Database();
        await db.run(`INSERT INTO questions (title, read, room_id) VALUES ("${question}", 0, "${roomId}");`);
        res.redirect(`/room/${roomId}`)
    }
}