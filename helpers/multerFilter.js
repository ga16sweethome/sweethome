module.exports = {
  fileFilter: async (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    if (
      !(
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      )
    ) {
      return cb(new Error("Please select image files only"), false);
    }

    if (fileSize > 2 * 1024 * 1024) {
      return cb(new Error("File Too large, maximum 2 Mb"), false);
    }
    cb(null, true);
  },
};
