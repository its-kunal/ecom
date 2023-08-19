import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../controllers/auth";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // TODO: retrieve and verify given jwt token, if true set it decoded token to req.user. else, return error
  const token = req.headers.authorization?.split(" ")[1] || "";

  try {
    await verifyToken({ token }).then((decoded) => {
      if (decoded === false) {
        return res.status(401).json({ message: "Token is not valid" });
      } else {
        // @ts-ignore
        req.user = decoded;
        return next();
      }
    });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
  // next();
}
