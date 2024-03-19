import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    fullName: String,
    firstName: String,
    description: String,
    instagram: String,
    github: String,
    mail: String
})

const about = mongoose.model('about_me', aboutSchema, 'about_me');

export default about;