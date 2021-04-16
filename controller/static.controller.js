const Order = require('../models/order.model')
const Book = require("../models/book.model")

module.exports.getStatis = async (req, res) => {
    if (req.query.type === undefined && req.query.value === undefined) {

        const result = new Map()
        const orders = await Order.find({status : 'pending' || 'finish'})

        const array = await statis(result, orders)


        res.render('layouts/statis-page', { array })
    } else {
        if (req.query.type === 'day') {
            const day = Date.parse(req.query.value);

            const result = new Map()
            const orders = await Order.find({date : day})

            const array = statis(result, orders)

            res.render('layouts/statis-page', { array })

        } else if (req.query.type === 'month') {

        } else if (req.query.type === 'year') {

        }

    }
}

const statis = async function (result, orders) {

    //Duệt qua các đơn hàng
    for (let order = 0; order < orders.length; order++) {

        const books = orders[order].bookID;
        const count = orders[order].count;

        //Duyệt qua các quyển sách và số lượng
        for (let book= 0; book < books.length; book++) {
            if (result.has(books[book])) {
                let sum = result.get(books[book]);
                sum.total += parseInt(count[book]);
                result.set(books[book], sum)
            } else {
                result.set(books[book], { total:  count[book]})
            }
        }
    }

    //Thêm tên sách và tính tổng tiền
    for (let [key, value] of result) {
        const book = await Book.findById(key)
        result.set(key, { totalPrice : book.price*parseInt(value.total), name : book.bookName, total : value.total })
    }

    const array = Array.from(result)
    return array;
}