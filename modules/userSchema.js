const { Schema } = require('mongoose');
const database = require('../services/database/sysMongo');
const collection = 'User';


const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: false,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: 320
    },
    phone: {
        type: String,
        default: "",
        required: false,
        maxlength: 24
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    status: {
        type: String,
        required: true,
        default: "Active",
        enum: ["Active", "InActive"]
    },
    role: {
        type: String,
        required: true,
        default: "Admin",
        enum: ["Admin", "Cheif", "Manager", "Waiter"]
    },
    home: {
        type: String,
        required: true,
        default: '/dashboard'
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: String
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
}, {
        timestamps: true
    });

schema.pre('save', function (next) {
    this.wasNew = this.isNew;

    let now = new Date();
    const user = this
    if (!user.isNew) {
        user.createdAt = now;
        user.createdBy = 'admin';
    }
    user.modifiedAt = now;
    user.modifiedBy = 'admin';
    
    next();
});

schema.post('init', (doc) => {
    debug('%s has been initialized from the db', doc.id);
});

schema.post('validate', (doc) => {
    debug('%s has been validated (but not saved yet)', doc.id);
});

schema.post('save', (doc) => {
    debug('%s has been saved', doc.id);
});

schema.post('remove', (doc) => {
    debug('%s has been removed', doc.id);
});

schema.pre('validate', (next) => {
    debug('this gets printed first');
    next();
});

schema.post('validate', () => {
    debug('this gets printed second');
});

schema.pre('find', (next) => {
    debug(this instanceof database._mongoose.Query);
    this.start = Date.now();
    next();
});

schema.post('find', (result) => {
    debug(this instanceof database._mongoose.Query);
    // prints returned documents
    debug('find() returned ' + JSON.stringify(result));
    // prints number of milliseconds the query took
    debug('find() took ' + (Date.now() - this.start) + ' millis');
});

schema.pre('update', (next) => {
    let ourDoc = this._update;
    if (ourDoc.modifiedAt) {
        ourDoc.modifiedAt = new Date(Date.now()).toISOString();
    }
    next();
});

schema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = (password === user.password); //await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
};

schema.statics.findByIdentity = async (email, phone) => {
    const user = await User.findOne({ email: email, phone: phone });
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
};

const User = database.model("User", schema);
module.exports = User;