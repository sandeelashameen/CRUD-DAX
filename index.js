import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/test";
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/users", userRoutes);

app.get("/", (req, res) => res.send("HELLO FROM HOMEPAGE"));

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
