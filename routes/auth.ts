import { Router } from "express";
import { createUser, generateToken, verifyUser } from "@/controllers/auth";
import { Auth } from "@/models/auth";

const router = Router();

// login
router.post("/login", async (req, res) => {
  let user: Auth = {
    username: req.body.username,
    password: req.body.password,
    name: "",
  };
  try {
    if (await verifyUser(user)) {
      const token = await generateToken({ user });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ message: "Logged in" });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

// logout
router.get("/logout", (req, res) => {
  res.setHeader("Authorization", "");
  res.send("Logged out");
});

// register
router.post("/signin", async (req, res) => {
  let user: Auth = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
  };
  try {
    await createUser({ user });
    user = { ...user, name: "" };
    const token = await generateToken({ user });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "User Created" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

export default router;
