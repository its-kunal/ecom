import { Schema, model } from "mongoose";
import { Product, productSchema } from "./product";

export interface Order {
  buyerName: string;
  buyerId: string;
  date: Date;
  items: [{ product: Product; quanity: number }];
  totalPrice: number;
}

export const orderSchema = new Schema<Order>({
  buyerName: String,
  buyerId: {
    type: String,
    index: true,
  },
  date: Date,
  items: [
    {
      product: productSchema,
      quanity: {
        type: Number,
        min: 0,
      },
    },
  ],
  totalPrice: Number,
});

orderSchema.pre("save", function (next) {
  this.date = new Date(Date.now());
  next();
});

export default model("Order", orderSchema);
