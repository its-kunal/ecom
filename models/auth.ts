import { model, Schema } from "mongoose";
import { hashSync } from "bcrypt";
import cartModel from "./cart";

export interface Auth {
  name: string;
  username: string;
  password: string;
}

export const authSchema = new Schema<Auth>({
  name: String,
  username: {
    type: String,
    index: true,
    unique: true,
  },
  password: String,
});

authSchema.pre("save", function (next) {
  this.password = hashSync(this.password, 8);
  // create empty cart when new user registers
  cartModel.create({ userId: this._id });
  next();
});

export default model("Auth", authSchema);
