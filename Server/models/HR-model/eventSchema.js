import mongoose from "mongoose"

const eventschema = mongoose.Schema({
  eventName:{
    type:String
  },
  eventPlace:{
    type:String
  },
  eventDate:{
    type:Date
  },
  eventType:{
    type:String
  },
  HRName:{
    type:String
  },
  eventPlaceName:{
    type:String
  },
  eventParagragh: {
    type:String
  },
  eventVisited:{
    type:Boolean
  },
  feedBack:{
    type:String
  }
})

const eventSchema = mongoose.model("hrevents", eventschema)
export default eventSchema;