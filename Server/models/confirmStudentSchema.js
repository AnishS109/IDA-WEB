import mongoose from "mongoose"

const confirmstudentSchema = new mongoose.Schema({
  fullName:{
    type:String,
  },
  salesName:{
    type:String,
  },
  contact_no:{
    type:String,
  },
  courseSpecialisation:{
    type:String,
  }
})

const confirmStudentSchema = mongoose.model("confirmedStudents", confirmstudentSchema)
export default confirmStudentSchema