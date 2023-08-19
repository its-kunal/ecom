import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
} from "../controllers/category";

const router = Router();

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    await createCategory({ name, description });
    return res.status(200).json({ message: "Category created successfully" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategory({ categoryId: id });
    return res.status(200).json(category);
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

export default router;
