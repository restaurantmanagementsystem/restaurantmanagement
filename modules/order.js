const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId : {
        type : Int16Array,
        required : true,
        autoincrement : true
    },
    status : {
        type : String,
        required : true,
        default : "InProcess",
        enum : ["InProcess", "Done"]
    },
    custName : {
        type : String,
        required : true
    },
    custPhno : Int16Array,
    tableNo : Int16Array,
    totalPrice : {
        type : Int16Array,
        required : true
    },
    quantity : {
        type : Int16Array,
        required : true
    },
    orderItemId : {
        type : Schema.ObjectId,
        ref : 'orderItem'
    },
    placedAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);