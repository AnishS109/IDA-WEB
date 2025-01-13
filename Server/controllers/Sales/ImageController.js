import grid from "gridfs-stream"
import mongoose from "mongoose"

const url = 'http://localhost:5000'

let gfs,gridfsBucket
const conn = mongoose.connection;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  })
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("photos")
})

export const getImage = async (req, res) => {
  // console.log("Requested filename:", req.params.filename);
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    // console.log("File found:", file);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    return res.status(500).json({ msg: "SERVER ERROR" });
  }
};

export const UploadImage = (req,res) => {
  
  if(!req.file){
    return res.status(404).json({message:"Image Not Found"})
  }

  const imageUrl = `${req.file.originalname}`

  return res.status(200).json(imageUrl)
}

