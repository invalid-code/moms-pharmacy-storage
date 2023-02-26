import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { medicine_route } from "./routes/medicineRoutes.js";
import { sales_route } from "./routes/salesRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.POST || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://jess:${process.env.MONGOPWD}@cluster0.fhmruza.mongodb.net/Medicines?retryWrites=true&w=majority`
);

app.use(medicine_route);
app.use(sales_route);

app.listen(port, () => console.log(`Server started on port ${port}`));
