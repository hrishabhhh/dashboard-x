import { ZodError } from "zod";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    const errors = {};
    err.issues.forEach((issue) => {
      errors[issue.path] = issue.message;
    });
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
