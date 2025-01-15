import mongoose from "mongoose"

const collegeformschema = mongoose.Schema({
  collegeName:{
    type:String
  },
  collegeLocation:{
    type:String
  },
  contactDetails:{
    type:String
  },
  collegeType:{
    type:String
  },
  email:{
    type:String
  },
  dealWith:{
    type:String
  },
  HRName:{
    type:String
  },
})

const CollegeFormSchema = mongoose.model("collegedetails", collegeformschema)
export default CollegeFormSchema;