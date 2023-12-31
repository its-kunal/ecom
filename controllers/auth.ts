import { verify, sign, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { compareSync } from "bcrypt";
import authModel, { Auth } from "@/models/auth";

dotenv.config();
const secret = process.env.SECRET || "";

export async function verifyToken({
  token,
}: {
  token: string;
}): Promise<boolean | JwtPayload> {
  let decoded: boolean | JwtPayload;
  try {
    // @ts-ignore
    decoded = verify(token, secret, (err, decoded) => {
      if (decoded) {
        return decoded;
      }
      return false;
    });
  } catch (err) {
    throw new Error("Invalid token");
  }
  return decoded;
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
    await authModel.create(user);
  } catch (err) {
    throw new Error("Error creating user");
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    await authModel.findByIdAndDelete(userId);
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
