import express from "express";
export const sales_route = express();
import Sales from "../models/Sales.js";

sales_route.get("/sales", async (_, res) => {
  const query = await Sales.find();
  res.send(query);
});

sales_route.post("/sales/new", async (req, res) => {
  const sale = new Sales({
    date: req.body.date,
    sales: req.body.sales,
    data: req.body.data,
  });
  await sale.save();
  res.send(sale);
});
