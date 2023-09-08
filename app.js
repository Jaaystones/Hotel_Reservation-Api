import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import * as authRoute from "./routes/auth.js";
import * as usersRoute from "./routes/users.js";
import * as hotelsRoute from "./routes/hotels.js";
import * as suitesRoute from "./routes/suites.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Set the strictQuery option
mongoose.set('strictQuery', false);

const connect = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(authRoute.default);
app.use(usersRoute.default);
app.use(hotelsRoute.default);
app.use(suitesRoute.default);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  connect();
  console.log(`Connected to backend at ${port}.`);
});