import "dotenv/config";
import app from "./app.js";

// dotenv.config();

const PORT = process.env.PORT;
console.log("BASE URL: ", process.env.API_BASE_URL);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
