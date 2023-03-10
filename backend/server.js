const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

const app = express();

require("dotenv").config();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//server port
const port = process.env.PORT;

//connect to database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

connectToDatabase();

//use routes
app.use("/", userRoutes);
app.use("/", postRoutes);

//home page
app.get("/", function (req, res) {
  res.send("it's working");
});

//start server
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('server started at port',port);
});
mongoose.set('strictQuery', true);