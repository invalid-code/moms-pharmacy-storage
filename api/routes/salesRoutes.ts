import express from "express";
export const sales_route = express();
import { Sales } from "../models/index.js";

sales_route.get("/sales", async (req, res) => {
  const query = await Sales.find();
  res.status(200).header("Access-Control-Allow-Origin", "*").json(query);
});

sales_route.post("/sales/new", async (req, res) => {
  const sale = new Sales({
    sales: req.body,
  });
  await sale.save();
  // const sale = new Sales(req.body);
  // await sale.save();
  res.send(sale);
});
