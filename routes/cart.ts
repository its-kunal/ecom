import { Router } from "express";
import { authMiddleware } from "@/middleware/auth";
import {
  clearCart,
  getCart,
  removeProduct,
  updateProductQuantity,
  addProduct,
} from "@/controllers/cart";
const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    await addProduct({
      item: { productId, quantity },
      // @ts-ignore
      userId: String(req.user.username),
    });
    return res.status(200).json({ message: "Product added to cart" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  try {
    await getCart({ userId: user.username }).then((cart) => {
      res.status(200).json(cart);
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  const { id } = req.params;
  const quanity = Number(req.query.quantity);
  try {
    await updateProductQuantity({
      productId: id,
      userId: user.username,
      changeBy: quanity,
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Updated successfully" });
});

router.delete("/:id", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  const { id } = req.params;
  try {
    await removeProduct({ productId: id, userId: user.username });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Updated successfully" });
});

router.delete("/", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  try {
    await clearCart({ userId: user.username });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Clear cart successfully" });
});

export default router;
