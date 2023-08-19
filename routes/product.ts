import { Router } from "express";
import { Product } from "../models/product";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
} from "../controllers/product";

const router = Router();

router.post("/", async (req, res) => {
  const { title, availability, categoryId, description, price }: Product =
    req.body;
  try {
    await addProduct({
      product: { title, availability, categoryId, description, price },
    });
    res.status(200).json({ message: "Product added successfully" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct({ productId: id });
  } catch (err: any) {
    return res.status(401).send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  let { query, categoryId, minPrice, maxPrice, availability }: any = req.query;

  try {
    const prods = await getProducts({
      query,
      categoryId,
      minPrice,
      maxPrice,
      availability,
    });
    return res.status(200).json(prods);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await getProduct({ productId: id });
    return res.status(200).json(prod);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

export default router;
