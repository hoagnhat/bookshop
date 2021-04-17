const Order = require('../models/order.model')
const Account = require('../models/account.model')
const Book = require('../models/book.model')

module.exports.insertIntoBasket = async (req, res) => {
    const id = req.params.id
    const { username } = req.user 
    const account = await Account.findOne({ username })
    const book = await Book.findById(id)
    const order = await Order.findOne({ userID: account.id })
    if (!order) {
        const bookArr = [id];
        const countArr = [1];
        // TODO: need to add date
        const newOrder = new Order({ userID: account.id, bookID: bookArr, count: countArr, total: book.price, status: 'in basket', date : date() })
        await newOrder.save()
        res.redirect('/cart')
    } else {
        const index = order.bookID.indexOf(id)
        if (index == -1) {
            order.bookID.push(id)
            order.count.push(1)
            order.total = order.total + book.price
        } else {
            let idx = order.bookID.indexOf(id)
            let itemCount = order.count[order.bookID.indexOf(id)]
            order.count[idx] = itemCount + 1
            order.total = order.total + book.price
        }
        order.status = 'in basket'
        order.date = date()
        // TODO: need add date
        await Order.updateOne({ userID: account.id }, order)
        res.redirect('/cart')
    }
}

module.exports.removeItem = async (req, res) => {
    const id = req.params.id
    const { username } = req.user

    const account = await Account.findOne({ username })
    const book = await Book.findById(id)
    const order = await Order.findOne({ userID: account.id })

    const idx = order.bookID.indexOf(id)
    let itemCount = order.count[idx]
    if (itemCount <= 1) {
        order.total = order.total - book.price * order.count[idx]
        order.bookID.splice(idx, 1)
        order.count.splice(idx, 1)
    } else {
        order.total = order.total - book.price
        order.count[idx] = itemCount - 1
    }
    await Order.updateOne({ userID: account.id }, order)
    res.redirect('/cart')
}

module.exports.deleteItem = async (req, res) => {
    const id = req.params.id
    const { username } = req.user

    const account = await Account.findOne({ username })
    const book = await Book.findById(id)
    const order = await Order.findOne({ userID: account.id })

    const idx = order.bookID.indexOf(id)
    order.total = order.total - book.price * order.count[idx]
    order.bookID.splice(idx, 1)
    order.count.splice(idx, 1)

    if (order.bookID.length == 0) {
        order.status = 'empty'
    }
    
    await Order.updateOne({ userID: account.id }, order)
    res.redirect('/cart')
}

module.exports.showBasket = async (req, res) => {
    const { username } = req.user
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
        const book = await Book.findById(bookArr[i])
        
        orders.push({ stt: i + 1, bookId: book.id, bookName: book.bookName, quantity: countArr[i], price: book.price  * countArr[i] })
    }
    if (bookArr.length == 0) {
        order.status = 'empty'
    }
    res.render('layouts/basket', { orders, status: order.status, total: order.total })
}

module.exports.cancelOrder = async (req, res) => {
    const { username } = req.user
    const account = await Account.findOne({ username })
    const order = await Order.findOne({ userID: account.id })
    order.bookID = []
    order.count = []
    order.total = 0
    order.status = 'in basket'
    await Order.updateOne({ userID: account.id }, order)
    res.redirect('/cart')
}

module.exports.payOrder = async (req, res) => {
    const { username } = req.user
    const account = await Account.findOne({ username })
    const order = await Order.findOne({ userID: account.id })
    order.status = 'pending'
    await Order.updateOne({ userID: account.id }, order)
    res.redirect('/index')
}

module.exports.showOrderManage = async (req, res) => {
    const orders = []
    const listOrders = await Order.find({ status: 'pending' })
    for (let i = 0; i < listOrders.length; i++) {
        const account = await Account.findById(listOrders[i].userID)
        const books = []
        for (let j = 0; j < listOrders[i].bookID.length; j++) {
            const book = await Book.findById(listOrders[i].bookID[j])
            books.push(book.bookName)
        }
        orders.push({ stt: i + 1, orderId: listOrders[i].id, buyer: account.name, bookName: books, quantity: listOrders[i].count, total: listOrders[i].total })
    }

    res.render('layouts/acceptOrder', { orders })
    return
}

module.exports.acceptOrder = async (req, res) => {
    const id = req.params.id
    const order = await Order.findById(id)
    for (let i = 0; i < order.bookID.length; i++) {
        const book = await Book.findById(order.bookID[i])
        const idx = order.bookID.indexOf(order.bookID[i])
        book.count -= order.count[idx]
        await Book.updateOne({ _id: book._id }, book)
    }
    order.status = 'accept'
    await Order.updateOne({ _id: order._id }, order)
    res.redirect('/order-manage')
}

module.exports.rejectOrder = async (req, res) => {
    const id = req.params.id
    const order = await Order.findById(id)
    order.status = 'reject'
    await Order.updateOne({ _id: order._id }, order)
    res.redirect('/order-manage')
}

const date = function () {
    let year = new Date().getFullYear()
    let abc = (new Date().getMonth() + 1).toString()
    let month =  abc.length == 1 ? '0' + abc : abc
    let day = new Date().getDate()

    let date = year + '-'+ month + '-' + day

    return date
}