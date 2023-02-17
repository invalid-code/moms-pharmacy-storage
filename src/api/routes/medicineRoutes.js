const express = require("express");
const { Medicines } = require("../models");
const medicine_route = express();

medicine_route.get("/medicines", async (req, res) => {
  const query = await Medicines.find({});
  res.status(200).header("Access-Control-Allow-Origin", "*").json({ query });
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
  const updated_medicine = await Medicines.updateOne(req.params.id, {
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price,
  });
  res.send(updated_medicine);
});

module.exports = { medicine_route };
