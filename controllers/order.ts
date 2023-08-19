import order from "../models/order";
import orderModel from "../models/order";
import productModel from "../models/product";
import { Product } from "../models/product";

export interface ItemRef {
  product: string;
  quanity: number;
}

interface Item {
  product: Product;
  quanity: number;
}

async function getItem({ itemRef }: { itemRef: ItemRef }): Promise<Item> {
  const product: any = await productModel.find({ productId: itemRef.product });
  return { product, quanity: itemRef.quanity };
}

export async function createOrder({
  items,
  userId,
  buyerName,
}: {
  items: ItemRef[];
  userId: string;
  buyerName: string;
}) {
  let confirmItems: Item[] = [];

  items.forEach(async (item) =>
    confirmItems.push(await getItem({ itemRef: item }))
  );

  let totalPrice = 0;
  confirmItems.forEach((item) => {
    totalPrice += item.product.price * item.quanity;
  });
  try {
    await orderModel.create({
      items: confirmItems,
      buyerId: userId,
      totalPrice,
      buyerName,
    });
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
