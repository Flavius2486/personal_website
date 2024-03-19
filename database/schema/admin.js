import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    username: String,
    password: String,
    key: String,
})

const admin = mongoose.model('admin', adminSchema, 'admin');

export default admin