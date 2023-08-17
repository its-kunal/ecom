import { model, Schema } from "mongoose";

export interface Cart {
  userId: string;
  items: [
    {
      productId: string;
      quantity: number;
    },
  ];
}

export const cartSchema = new Schema<Cart>({
  userId: {
    type: String,
    index: true,
  },
  items: [
    {
      productId: String,
      quantity: {
        type: Number,
        min: 0,
      },
    },
  ],
});

export default model("Cart", cartSchema);
