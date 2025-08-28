const errorHandler = (error, _req, res, _next) => {
  res.status(error.cause || 500).json({ msg: error.message });
};
export default errorHandler;
