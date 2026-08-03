import "dotenv/config";
import app from "./app.js";

// dotenv.config();
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT;
await connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
