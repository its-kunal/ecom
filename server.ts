import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import productRouter from "./routes/product";
import orderRouter from "./routes/order";
import categoryRouter from "./routes/category";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello World, From Ecom!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
