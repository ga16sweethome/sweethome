const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const errorHandler = require("../helpers/error-handler");
const cloudinary = require("../config/cloudinary");
const { fileFilter } = require("../helpers/multerFilter");

module.exports = {
  uploadCloudinary: (fieldName) => {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        return {
          folder: "/sweethome",
          resource_type: "raw",
          public_id: Date.now() + "-" + file.originalname,
        };
      },
    });

    const upload = multer({ storage, fileFilter }).single(fieldName);

    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          return errorHandler(res, err);
        }
        next();
      });
    };
  },
  uploadArrayCloud: (fieldName) => {
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        return {
          folder: "/sweethome",
          resource_type: "raw",
          public_id: Date.now() + "-" + file.originalname,
        };
      },
    });

    const upload = multer({ storage, fileFilter }).array(fieldName);

    return (req, res, next) => {
      upload(req, res, (err) => {
        if (err) {
          return errorHandler(res, err);
        }
        next();
      });
    };
  },
};
