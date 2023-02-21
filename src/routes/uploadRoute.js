const Express = require('express')
const cloudinaryService = require('../helpers/cloudinary_service')

const uploadRoute = Express.Router()

uploadRoute.post('/upload_img', cloudinaryService.uploadImg)

module.exports = uploadRoute