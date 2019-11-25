const UserDex = require("../models/UserDex");

const addDex = (req, resp) => {
    // console.log(req.body)
    const { user_id } = req.body
    const dex = parseInt(req.body.dex)
    UserDex.findOne({user_id: user_id}).then((res, err) => {
        let prevDex = parseInt(res.dex)
        UserDex.updateOne({user_id: user_id}, {$set: {dex: prevDex + dex}}).then((res, err) => {
            resp.sendStatus(200)
        })
    })
}

const subtractDex = (req, resp) => {
    // console.log(req.body)
    const { user_id } = req.body
    const dex = parseInt(req.body.dex)
    UserDex.findOne({user_id: user_id}).then((res, err) => {
        let prevDex = parseInt(res.dex)
        UserDex.updateOne({user_id: user_id}, {$set: {dex: prevDex - dex}}).then((res, err) => {
            resp.sendStatus(200)
        })
    })
}

module.exports = {
    addDex, subtractDex
};