const Account = require('../models/account.model')
module.exports.loadAdminPage = async (req, res) => {
    const { username } = req.user
    const acc = await Account.findOne({ username })
    res.render('layouts/admin', { username : acc.username })
}