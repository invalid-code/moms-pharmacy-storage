import mongoose, { Schema } from "mongoose";
import { SalesData } from "../../src/MedicineList.js";

const medicines_schema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});
const Medicines = mongoose.model("Medicine", medicines_schema);

const sales_schema = new Schema({
  sales: {
    type: [
      {
        date: String,
        sales: Number,
        data: [{ name: String, sold_quantity: Number, price: Number }],
      },
    ],
  },
});
const Sales = mongoose.model("Sale", sales_schema);

export { Medicines, Sales };
