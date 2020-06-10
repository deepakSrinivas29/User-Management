const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle-ware
app.use(cors());
app.use(express.json()); // helps parse json

// setting up mongoDB using mongoose
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB connection established successfully!")
);

// add routes
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

// to start our server
app.listen(port, () => console.log(`Server is running on port: ${port}`));
