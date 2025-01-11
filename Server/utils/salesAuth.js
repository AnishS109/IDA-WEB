export const salesAuthorisation = async(req,res,next) => {
  const {role} = req.body

  try {
    if(!role){
      return res.status(401).json({message:"Something Went Wrong! Please Login Again"})
    }

    if(role !== "Sales"){
      return res.status(403).json({message:"UnAuthorised Login"})
    }

    next();
    
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Please Login Again"})
  }
}