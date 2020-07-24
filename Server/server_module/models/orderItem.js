const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
   
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        required : true,
        maxlength : 36
    },
    
    foodtype : {
        type : String,
        required : true,
        default : "Veg",
        enum : ["Veg", "NonVeg"]
    },
    rate : {
        type : Number,
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