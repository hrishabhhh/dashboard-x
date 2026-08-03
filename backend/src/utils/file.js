import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, "../src/data/users.json");

export async function readUsers() {
  const userData = await fs.readFile(USERS_FILE, "utf-8");
  const parsedData = JSON.parse(userData);
  return parsedData;
}

export async function writeUsers(users) {
  const stringifyedData = JSON.stringify(users, null, 2);
  await fs.writeFile(USERS_FILE, stringifyedData, "utf-8");
}
