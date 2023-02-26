import mongoose from "mongoose";

const medicines_schema = new mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
});

const Medicines = mongoose.model("Medicine", medicines_schema);

export default Medicines;
