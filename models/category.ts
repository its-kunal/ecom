import { model, Schema } from "mongoose";

export interface Category {
  name: string;
  description: string;
}

export const categorySchema = new Schema<Category>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
});

export default model("Category", categorySchema);
