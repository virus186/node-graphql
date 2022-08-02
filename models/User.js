const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {type: String, default : null , },
    email: {type: String, default : null , unique : true},
    password: {type: String, default : null , },
    company_name: [],
    address: [],
    offers: [],
    active: Boolean,
    role: {type: String, default : null , },
    token: {type: String, default : null , },
    createdAt: {type: String, default : null , },
    createdBy: {type: String, default : null , }
});

module.exports = model('Users', userSchema);