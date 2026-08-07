import { registerSchema } from "../validators/auth.validatior.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      next();
    } else {
      next(result.error);
    }
  };
};
