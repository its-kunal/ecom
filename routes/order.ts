import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  ItemRef,
  createOrder,
  getOrder,
  getOrders,
} from "../controllers/order";

const router = Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { itemRef }: { itemRef: ItemRef[] } = req.body;
  try {
    // @ts-ignore
    await createOrder({
      items: itemRef,
      // @ts-ignore
      userId: req.user.username,
      // @ts-ignore
      buyerName: req.user.name,
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ message: "Order created successfully" });
});

router.get("/", async (req, res) => {
  let orders = [];
  try {
    // @ts-ignore
    orders = await getOrders({ buyerId: req.user.username });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ orders });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let order;
  try {
    order = await getOrder({ orderId: id });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  res.status(200).json({ order });
});

export default router;
