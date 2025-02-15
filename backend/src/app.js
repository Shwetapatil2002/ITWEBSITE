import dotenv from "dotenv"; 
dotenv.config(); // Load environment variables at the beginning

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "./config/passportConfig.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import database configuration
import "./database/dbconfig.js";

// Import routes
import userRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import companyRouter from "./routes/comp.route.js";
import contentRouter from "./routes/content.route.js";
import userNotifyRouter from "./routes/userNotify.route.js";
import performanceRouter from "./routes/perfomance.route.js";
import taskRouter from "./routes/task.route.js";
import empRouter from "./routes/employee.route.js";
import project from "./routes/project.route.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser(process.env.SESSION_SECRET || "default_secret"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRouter);
app.use("/api/v1", companyRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", userNotifyRouter);
app.use("/api/v1", performanceRouter);
app.use("/api/v1", taskRouter);
app.use("/api/v1", empRouter);
app.use("/api/v1", project);


app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
