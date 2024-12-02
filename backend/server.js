import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true, limit:'10mb' }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
