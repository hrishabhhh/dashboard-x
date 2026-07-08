export function errorHandler(err, req, res, next) {
  return res.status(err.statuscode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
