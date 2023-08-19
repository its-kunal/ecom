import { Schema, model } from "mongoose";

export interface Product {
  title: string;
  price: number;
  description: string;
  availability: boolean;
  categoryId: string;
}

export const productSchema = new Schema<Product>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  description: String,
  availability: {
    type: Boolean,
    index: true,
    default: true,
  },
  categoryId: {
    type: String,
    index: true,
  },
});

export default model("Product", productSchema);
