import express from "express";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import helmet from "helmet";
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DashboardX Backend Running",
  });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
