import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
import scholarshipRoutes from "./routes/scholarships.js";
import applicationRoutes from "./routes/applications.js";
import sopRoutes from "./routes/sop.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/sop", sopRoutes);
app.use("/api/admin", adminRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
