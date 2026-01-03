const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const route = require("./routes/userRoute");

const app = express();

const corsPort = process.env.PORTCLIENT;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT;
const mongourl = process.env.MONGODB_URL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api",route);
