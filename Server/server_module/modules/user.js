const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true },
	firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
	phone: { type: String, required: false },
    password: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
    home: { type: String, required: true }
    
});
user.pre('save', () => {
    let now = new Date();
    if (!this.isNew) {
        this.createdAt = now;
        this.createdBy = 'admin';
    }
    this.modifiedAt = now;
    this.modifiedBy = 'admin';
});
module.exports = mongoose.model('User', user);