const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const AdminUserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isadmin: { type: Boolean, required: true }
});

const Admin = mongoose.model('Admin', AdminUserSchema);

module.exports = Admin;

/*
Esimerkki administa json-muodossa:

{
    "username": "admin",
    "password": "admin123",
    "isadmin": true
}

 */