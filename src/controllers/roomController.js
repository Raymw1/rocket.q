module.exports = {
    create(req, res) {
        let roomId = 1;
        return res.redirect(`room/${roomId}`)
    }
}