import mongoose from "mongoose";

const sales_schema = new mongoose.Schema({
  date: String,
  sales: Number,
  data: [{ name: String, sold_quantity: Number, price: Number }],
});

const Sales = mongoose.model("Sale", sales_schema);

export default Sales;
