import express from "express";
export const medicine_route = express();

import { Medicines } from "../models/index.js";

medicine_route.get("/medicines", async (req, res) => {
  const query = await Medicines.find({});
  res.status(200).header("Access-Control-Allow-Origin", "*").json(query);
});

medicine_route.post("/medicines/new", async (req, res) => {
  const medicine = new Medicines({
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
  });
  await medicine.save();
  res.send(medicine);
});

medicine_route.patch("/medicines/:id/edit", async (req, res) => {
  const updated_medicine = await Medicines.updateOne(
    { _id: req.params.id },
    {
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
    }
  );
  res
    .status(200)
    .header("Access-Control-Allow-Origin", "*")
    .json(updated_medicine);
});
