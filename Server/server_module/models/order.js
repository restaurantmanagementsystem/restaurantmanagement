const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId : {
        type : Number,
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
    custPhno : String,
    tableNo : String,
    totalPrice : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
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

order.pre('save', () => {
    let now = new Date();
    if (!this.isNew) {
        this.createdAt = now;
        this.createdBy = 'admin';
    }
    this.modifiedAt = now;
    this.modifiedBy = 'admin';
});


module.exports = mongoose.model('Order', order);