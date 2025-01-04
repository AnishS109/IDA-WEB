import mongoose from "mongoose"

const userregisterschema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true,
    unique: true
  },
  phoneNumber:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  role:{
    type: String,
    required: true,
  }
})

const userRegisterSchema = mongoose.model("User Register", userregisterschema)
export default userRegisterSchema;