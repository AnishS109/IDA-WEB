import mongoose from "mongoose"

const callingtudentSchema = new mongoose.Schema({
  Enrollment:{
    type:String,
  },
  Name:{
    type:String,
  },
DOB:{
    type:String,
  },
  Mobile_No:{
    type:String,
  },
Email_ID:{
    type:String,
  },

  Branch:{
    type:String,
  },
  
Course:{
    type:String,
  }
})

const CallingStudentSchema = mongoose.model("callingstudentsdatas", callingtudentSchema)
export default CallingStudentSchema;