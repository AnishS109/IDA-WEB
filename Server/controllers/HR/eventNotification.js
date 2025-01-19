import eventSchema from "../../models/HR-model/eventSchema.js"

// -------------  SUBMIT EVENT DATA (POST REQUEST) --------------

export const addEventNotification = async(req, res) => {
  const {HRName, eventName, eventDate, eventPlace, eventType, eventPlaceName } = req.body
  
  try {
    if(!HRName){
      return res.status(400).json({message:"Something Went Wrong. Please login again!"})
    }
    const event = new eventSchema({
      eventName, 
      eventDate, 
      eventPlace, 
      eventType, 
      eventPlaceName,
      HRName
    })
    await event.save()
    return res.status(200).json({message:"Successfully Submitted"})
  } catch (error) {
    console.log("ERROR WHILE SUBMITTING EVENTS DETAILS:", error)
    return res.status(500).json({message:"Something went wrong. Please try again later."})
  }
}

// -------------  SET EVENT VISITED OR NOT (POST REQUEST) --------------

export const setEventVisit = async (req, res) => {
  const { HRName, eventName } = req.body;

  try {
    if (!HRName) {
      return res.status(400).json({ message: "Something Went Wrong. Please login again!" });
    }

    const event = await eventSchema.findOne({ HRName, eventName });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }
    
    event.eventVisited = true;
    await event.save();

    return res.status(200).json({ message: "Successfully Submitted." });
  } catch (error) {
    console.error("ERROR WHILE SUBMITTING EVENT DETAILS:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};


// -------------  FETCHING EVENT DATA (GET REQUEST) --------------

export const fetchEventData = async (req, res) => {
  const { HRName } = req.query;
  
  try {

    if (!HRName) {
      return res.status(400).json({ message: "Something Went Wrong. Please login again krro!" });
    }

    const eventData = await eventSchema.find({
      HRName,
    });

    if (!eventData || eventData.length === 0) {
      return res.status(404).json({ message: "No Upcoming Events" });
    }

    return res.status(200).json(eventData);
  } catch (error) {
    console.log("ERROR WHILE FETCHING EVENTS DETAILS:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

// -------------  FETCHING EVENT DATA [ONLY VISITED EVENTS] (GET REQUEST) --------------

export const fetchVisitedEventData = async(req, res) => {
  const {HRName} = req.query

if(!HRName){
  return res.status(400).json({message:"Something Went Wrong! Please Login Again"})
}

try{
  const visitedEventData = await eventSchema.find({HRName, 
  eventVisited:true})

if(!visitedEventData){
  return res.status(404).json({message:"No Data is available"})
}

  return res.status(200).json(visitedEventData)
}
catch(error){
  console.log("ERROR WHILE FETCHING VISITED DATA:", error)
  return res.status(500).json({message:"ERROR WHILE FETCHING VISITED DATA"})
  }
}

// -------------  SET EVENT FEEDBACK (POST REQUEST) --------------

export const addFeedBackEvent = async(req, res) => {
  const {HRName, feedBack, eventName, eventPlaceName} = req.body

  if(!HRName){
    return res.status(400).json({message:"Something Went Wrong! Please Login Again"})
  }

  try {
    const feedbackEvent = await eventSchema.findOne({HRName, eventName, eventPlaceName})

    feedbackEvent.feedBack = feedBack
    await feedbackEvent.save()
    return res.status(200).json({message:"FeedBack Added Successfully"})
  } catch (error) {
    console.log("ERROR WHILE POSTING FEEDBACK DATA:", error)
    return res.status(500).json({message:"Error While Submitting FeedBack Data"})
  }
}