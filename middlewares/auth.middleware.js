const Account = require('../models/account.model')

module.exports.requireAuth = async (req, res, next) => {
    const { username } = req.signedCookies
    if (!username) {
        res.render('auth/login', { fromUrl: req.url })
    } else {
        const account = await Account.findOne({ username })
        req.user = { username: account.username, role: account.role }
        next()
    }
}

module.exports.isUser = async (req, res, next) => {
    const { role } = req.user
    if (role == 'user' || role == 'admin') {
        next()
    } else {
        res.render('auth/cannotAccess')
        return
    }
}

module.exports.justUser = async (req, res, next) => {
    const { role } = req.user
    if (role == 'user') {
        next()
    } else {
        res.render('auth/cannotAccess')
        return
    }
}

module.exports.isAdmin = async (req, res, next) => {
    const { role } = req.user
    if (role == 'admin') {
        next()
    } else {
        res.render('auth/cannotAccess')
        return
    }
}

module.exports.checkCookies = async (req, res, next) => {
    const { username } = req.signedCookies
    if (username != null) {
        const account = await Account.findOne({ username })
        req.user = { username: account.username, role: account.role}
        if (account.role == "admin") {
            res.redirect('/admin')
            return
        }
    } else {
        res.clearCookie()
    }
    next()
}