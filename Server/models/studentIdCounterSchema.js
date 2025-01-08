import mongoose from "mongoose";

const studentIdCounterSchema = new mongoose.Schema({
  prefix: { type: String, default: "IDA@25/" },
  seq: { type: Number, default: 1 }, 
});

const StudentIdCounterSchema = mongoose.model("studentenrollmentnumbers", studentIdCounterSchema);

export default StudentIdCounterSchema;
