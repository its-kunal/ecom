import order from "../models/order";
import orderModel from "../models/order";
import { Product } from "../models/product";

export async function createOrder({
  items,
  userId,
}: {
  items: { product: Product; quanity: number }[];
  userId: string;
}) {
  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.product.price * item.quanity;
  });
  try {
    await orderModel.create({ items, userId, totalPrice });
  } catch (err) {
    throw new Error("Error creating order");
  }
}

export async function getOrders({ buyerId }: { buyerId: string }) {
  try {
    return await orderModel.find({ buyerId });
  } catch (err) {
    throw new Error("Error getting orders");
  }
}

export async function getOrder({ orderId }: { orderId: string }) {
  try {
    return await orderModel.findById(orderId);
  } catch (err) {
    throw new Error("Error getting order");
  }
}
