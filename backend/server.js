// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve frontend build
app.use("/", express.static(path.join(__dirname, "../frontend/dist")));

// Serve admin build
app.use("/admin", express.static(path.join(__dirname, "../admin/dist")));
 
// Handle Vite SPA fallback
app.get("*", (req, res) => {
  if (req.path.startsWith("/admin")) {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  } else {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  }
});

app.listen(PORT, () => {
  console.log(`🟢 Frontend/Admin server on http://localhost:${PORT}`);
});
