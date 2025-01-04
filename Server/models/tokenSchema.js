import mongoose from "mongoose"

const tokenschema = new mongoose.Schema({
  token:{
    type: String,
  }
})

const TokenSchema = mongoose.model("token", tokenschema)
export default TokenSchema;