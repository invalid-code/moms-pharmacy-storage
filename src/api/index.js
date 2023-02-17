const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { medicine_route } = require("./routes/medicineRoutes");
require("dotenv").config();

const port = process.env.POST || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://jess:${process.env.MONGOPWD}@cluster0.fhmruza.mongodb.net/Medicines?retryWrites=true&w=majority`
);

app.use(medicine_route);

app.listen(port);

console.log(`Server started on port ${port}`);
