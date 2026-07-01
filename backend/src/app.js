import express from "express";
import userRoutes from "./routes/users.routes.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DashboardX Backend Running",
  });
});

app.use("/users", userRoutes);

export default app;
