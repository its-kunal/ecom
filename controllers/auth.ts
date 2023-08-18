import { verify, sign, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { compareSync } from "bcrypt";
import authModel, { Auth } from "../models/auth";

dotenv.config();
const secret = process.env.SECRET || "";

export async function verifyToken({
  token,
}: {
  token: string;
}): Promise<boolean | JwtPayload> {
  try {
    verify(token, secret, (err, decoded) => {
      if (err) {
        return false;
      }
      return decoded;
    });
  } catch (err) {
    throw new Error("Invalid token");
  }
  return false;
}

export async function generateToken({ user }: { user: Auth }) {
  try {
    return sign(user, secret, { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Error generating token");
  }
}

export async function createUser({ user }: { user: Auth }) {
  try {
    authModel.create(user);
  } catch (err) {
    throw new Error("Error creating user");
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    authModel.findByIdAndDelete(userId);
  } catch (err) {
    throw new Error("Error deleting user");
  }
}

export async function verifyUser({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<boolean> {
  try {
    const authUser = await authModel.findOne({ username });
    if (authUser) {
      if (compareSync(password, authUser.password)) {
        return true;
      } else throw new Error("Incorrect password");
    } else {
      throw new Error("no user found");
    }
  } catch (err) {
    throw new Error("Error verifying user");
  }
}
