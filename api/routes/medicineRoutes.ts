import express from "express";
export const medicine_route = express();

import Medicines from "../models/Medicines.js";

medicine_route.get("/medicines", async (_, res) => {
  const query = await Medicines.find();
  res.send(query);
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
  res.send(updated_medicine);
});

medicine_route.delete("/medicines/:id/delete", async (req, res) => {
  await Medicines.deleteOne({ _id: req.params.id })
  res.send()
});
