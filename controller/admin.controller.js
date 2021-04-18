const Currentuser = require('../controller/account.check')
module.exports.loadAdminPage = async (req, res) => {
    const acc = await Currentuser.getCurrentUser(req, res)
    res.render('layouts/admin', { username : acc })
}