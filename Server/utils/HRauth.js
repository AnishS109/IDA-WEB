export const HRAuthorisation = async(req,res,next) => {
  const role = req.body?.role || req.query?.role;

  try {
    if(!role){
      return res.status(401).json({message:"Something Went Wrong! Please Login Again"})
    }

    if(role !== "HR"){
      return res.status(403).json({message:"UnAuthorised Login"})
    }

    next();
    
  } catch (error) {
    return res.status(500).json({message:"Something Went Wrong! Please Login Again"})
  }
}