import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { medicine_route } from "./routes/medicineRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.POST || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.default.urlencoded({ extended: true }));
app.use(bodyParser.default.json());
app.use(express.json());

mongoose.connect(
  `mongodb+srv://jess:${process.env.MONGOPWD}@cluster0.fhmruza.mongodb.net/Medicines?retryWrites=true&w=majority`
);

app.use(medicine_route);

app.listen(port, () => console.log(`Server started on port ${port}`));
