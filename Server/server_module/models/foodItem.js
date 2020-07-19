const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodItem = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : {
        type : String,
        required : true,
        maxlength : 36
    },    
    foodType : {
        type : String,
        required : true,
        default : "Veg",
        enum : ["Veg", "NonVeg"]
    },
    rate : {
        type : Number,
        required : true
    },
    description: {
        type: String,
        required: true
    },    
    category : {
        type : String,
        required : true,
        default : "MainCourse",
        enum : ["Starters", "MainCourse", "Beverages", "Breads", "Deserts"]
    }
});
foodItem.pre('save', () => {
    let now = new Date();
    if (!this.isNew) {
        this.createdAt = now;
        this.createdBy = 'admin';
    }
    this.modifiedAt = now;
    this.modifiedBy = 'admin';
});

module.exports = mongoose.model('FoodItem', foodItem);