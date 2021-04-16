const Account = require('../models/account.model')

module.exports.requireAuth = async (req, res, next) => {
    const { username } = req.signedCookies
    if (!username) {
        res.render('auth/login', { fromUrl: req.baseUrl })
    } else {
        const account = await Account.findOne({ username })
        req.body = { username: account.username, role: account.role }
        next()
    }
}