import expresss from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.routs.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path'

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connecte to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname=path.resolve();

const app = expresss();
// Serve static files from the React app
app.use(expresss.static(path.join(__dirname, 'client/build')));

// Serve the index.html file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});




app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(expresss.json());


app.listen(8080, () => {
  console.log("server is running on port 8080");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    message,
    success: false,
    statusCode,
  });
});
