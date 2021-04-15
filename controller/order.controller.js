const Order = require('../models/order.model')
const Account = require('../models/account.model')
const { count } = require('../models/account.model')

module.exports.insertIntoBasket = async (req, res) => {
    // TODO: need to change with id paramss
    // const id = req.params.id
    const id = '60780e8e44e2ce31b442e80a'
    const { username } = req.body 
    const account = await Account.findOne({ username })

    const order = await Order.findOne({ userID: account.id })
    if (!order) {
        const bookArr = [id];
        const countArr = [1];
        const newOrder = new Order({ userID: account.id, bookID: bookArr, count: countArr })
        await newOrder.save()
        res.render('layouts/hello')
        return
    } else {
        const index = order.bookID.indexOf(id)
        if (index == -1) {
            order.bookID.push(id)
            order.count.push(1)
            
        } else {
            let idx = order.bookID.indexOf(id)
            let itemCount = order.count[order.bookID.indexOf(id)]
            order.count[idx] = itemCount + 1
        }
        await Order.updateOne({ userID: account.id }, order)
        res.render('layouts/hello')
        return
    }
}

module.exports.showBasket = async (req, res) => {
    const { username } = req.body
    const account = await Account.findOne({ username })
    const orders = []

    const order = await Order.findOne({ userID: account.id })

    if (!order) {
        res.render('layouts/basket')
        return
    }

    const bookArr = order.bookID
    const countArr = order.count

    for (let i = 0; i < bookArr.length; i++) {
        // TODO: Need to change with book model
        // const book = await Book.findById(bookArr[i])
        orders.push({ stt: i + 1, bookName: bookArr[i], quantity: countArr[i], status: order.status })
    }

    res.render('layouts/basket', { orders })
}