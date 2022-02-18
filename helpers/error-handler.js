module.exports = (res, error) => {
  return res.status(500).json({
    message: error.message,
    status: "Internal Server Error",
  });
};
