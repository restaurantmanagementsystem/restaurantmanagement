const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    Name : {
        type : String,
        required : true,
        maxlength : 36
    },
    id : {
        type : Int16Array,
        autoincrement : true,
        unique : true
    },
    foodtype : {
        type : String,
        required : true,
        default : "Veg",
        enum : ["Veg", "NonVeg"]
    },
    image : {
        type : String,
    },
    rate : {
        type : Int16Array,
        required : true
    },
    description : String,
    category : {
        type : String,
        required : true,
        default : "MainCourse",
        enum : ["Starters", "MainCourse", "Beverages", "Breads", "Deserts"]
    }
});


module.exports = mongoose.model('orderItem', OrderItemSchema);