import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema({
  iconPath: String,
  technologyName: String,
});

const skills = mongoose.model("skills", skillsSchema, "skills");

export default skills;
