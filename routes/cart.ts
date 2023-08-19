import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  clearCart,
  getCart,
  removeProduct,
  updateProductQuantity,
} from "../controllers/cart";
const router = Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  try {
    await getCart({ userId: user._id }).then((cart) => {
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
  const quanity = Number(req.query.quanity);
  try {
    await updateProductQuantity({
      productId: id,
      userId: user._id,
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
    await removeProduct({ productId: id, userId: user._id });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Updated successfully" });
});

router.delete("/", async (req, res) => {
  // @ts-ignore
  const user: Auth = req.user;
  try {
    await clearCart({ userId: user._id });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Clear cart successfully" });
});

export default router;
