const multer = require('multer');

const upload_images = multer({ dest: "./uploads/images" })

module.exports = { upload_images };