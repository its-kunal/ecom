import { model, Schema } from "mongoose";

export interface Category {
  name: string;
  description: string;
}

export const categorySchema = new Schema<Category>({
  name: String,
  description: String,
});

export default model("Category", categorySchema);
