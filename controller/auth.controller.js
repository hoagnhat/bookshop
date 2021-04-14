const Account = require('../models/account.model')

module.exports.GetLogin = (req, res) => {
    res.render('auth/login')
}

module.exports.PostLogin = async (req, res) => {
    const { username, password } = req.body
    const messages = [];
    const account = await Account.findOne({ username })
    // Check username exist
    if (account != null) {
        // Check password
        if (account.password !== password) {
            messages.push(`Wrong password!`)
        }
    } else {
        // When account == null
        messages.push(`Username doesn't exist!`)
    }

    if (messages.length > 0) {
        res.render('auth/login', { messages })
    } else {
        res.render('layouts/hello')
    }
}