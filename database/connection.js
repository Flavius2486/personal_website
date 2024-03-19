import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/fl4v1u5", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));
};

export default databaseConnection;
