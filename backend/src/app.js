import express from "express";
import userRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import helmet from "helmet";
const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
  }),
);
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
