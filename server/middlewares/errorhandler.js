const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  res.status(404).json({
    success: false,
    message: "This Webpage Does Not Exists!!",
  });
};

module.exports = { notFound };
