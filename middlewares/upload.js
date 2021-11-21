const multer = require("multer")
const path = require("path")

const postImage = async (req, res) => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(req.query.reason == "product"){
        cb(null, "public/uploads/products")
      }
      if(req.query.reason == "user"){
        cb(null, "public/uploads/user")
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({storage: storage}).single('file')
  
  upload(req, res, async(err) => {
    if(err){
      return res.status(400).json({message: "image not uploaded"})
    }
    req.file.destination = req.file.destination + "/" + req.file.filename
    return res.status(200).json({ message: "Image uploaded", data: req.file })
  })
}


module.exports = postImage