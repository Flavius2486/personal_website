import mongoose from 'mongoose';

const projectsSchema = mongoose.Schema({
    title: String,
    contribution: String,
    detalies: String,
    technologiesUsed: String,
    imagesPath: [String],
    projectLink: String
})

const projects = mongoose.model('projects', projectsSchema, 'projects');

export default projects