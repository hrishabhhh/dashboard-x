// import express from "express";

// const app = express;

// const PORT = 5000;

// app.get("/", (req, res) => {
//   res.json({
//     message: "DashboardX Backend Running",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Application is running on port: ${PORT}`);
// });

import express from "express";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "DashboardX Backend Running",
  });
});

app.use("/users", userRoutes);

export default app;
