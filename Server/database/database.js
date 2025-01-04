import mongoose from "mongoose";

const ConnectionDB = async() => {

  const URl = "mongodb+srv://root:6TmgY4T39vnnMS6b@lms.8dvli.mongodb.net/IDA?retryWrites=true&w=majority";

  try {

    await mongoose.connect(URl)
    console.log("Connected to Database");
  } catch (error) {

    console.log("Error in connecting to Databse",error)
  }
}

export default ConnectionDB;