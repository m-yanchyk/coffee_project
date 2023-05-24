require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");
const errorMiddlevare = require("./middlewares/errors")

const PORT = process.env.PORT || 6000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", authRouter);
app.use(errorMiddlevare);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
