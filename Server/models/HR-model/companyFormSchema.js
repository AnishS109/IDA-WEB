import mongoose from "mongoose"

const companyformschema = mongoose.Schema({
  companyName:{
    type:String
  },
  companyLocation:{
    type:String
  },
  contactDetails:{
    type:String
  },
  companyType:{
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
  }
})

const CompanyFormSchema = mongoose.model("companydetails", companyformschema)
export default CompanyFormSchema;