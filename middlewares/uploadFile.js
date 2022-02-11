const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const errorHandler = require("../helpers/error-handler");
const cloudinary = require("../config/cloudinary");

module.exports = {
  uploadCloudinary: (fieldName) => {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        return {
          folder: fieldName,
          resource_type: "raw",
          public_id: Date.now() + "-" + file.originalname,
        };
      },
    });
    const upload = multer({ storage }).single(fieldName);
    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          errorHandler(res, err);
        }
        next();
      });
    };
  },
};
