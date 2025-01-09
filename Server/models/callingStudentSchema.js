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
    },
  response1:{
    type:String,
  },
  response2:{
    type:String,
  },
  response3:{
    type:String,
  },
  response4:{
    type:String,
  },
  response5:{
    type:String,
  },
  response6:{
    type:String,
  },
  response7:{
    type:String,
  },
  response8:{
    type:String,
  },
  salesName:{
    type:String,
  },
})

const CallingStudentSchema = mongoose.model("callingstudentsdatas", callingtudentSchema)
export default CallingStudentSchema;