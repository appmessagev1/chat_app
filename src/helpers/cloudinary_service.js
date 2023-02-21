const cloudinary = require('../../cloudinary.config')

const cloudinaryService = {
  uploadImg: async (req, res, next) => {
    const img = req.body.image
    cloudinary.uploader
      .upload(img)
      .then(result => {
        return res.status(200).json({ error_code: 0, data: result, message: "Upload image successfully", userId: req.body.userId });
      })
      .catch(error => {
        return res.status(300).json({ error_code: 102, message: "Upload image error" })
      });
  }
}

module.exports = cloudinaryService