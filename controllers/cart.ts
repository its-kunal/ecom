import cartModel from "../models/cart";

export async function addProduct({
  item,
  userId,
}: {
  item: { productId: string; quantity: number };
  userId: string;
}) {
  try {
    await cartModel.findOneAndUpdate(
      { userId },
      {
        $push: { items: item },
      },
    );
  } catch (err) {
    throw new Error("Error adding product to cart");
  }
}

export async function updateProductQuantity({
  productId,
  userId,
  changeBy,
}: {
  productId: string;
  userId: string;
  changeBy: number;
}) {
  try {
    await cartModel.findOneAndUpdate(
      { userId, "items.productId": productId },
      {
        $inc: { "items.$.quantity": changeBy },
      },
    );
  } catch (err) {
    throw new Error("Error updating product quantity");
  }
}

export async function removeProduct({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  try {
    await cartModel.updateOne({ userId }, { $pull: { items: { productId } } });
  } catch (err) {
    throw new Error("Error removing product from cart");
  }
}

export async function clearCart({ userId }: { userId: string }) {
  try {
    await cartModel.updateOne({ userId }, { $set: { items: [] } });
  } catch (err) {
    throw new Error("Error clearing cart");
  }
}

export async function getCart({ userId }: { userId: string }) {
  try {
    const cart = await cartModel.find({ userId });
    return cart;
  } catch (err) {
    throw new Error("Error getting cart");
  }
}
