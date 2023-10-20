'use strict';

var express = require('express');
var dotenv = require('dotenv');
var authRouter = require('@/routes/auth');
var cartRouter = require('@/routes/cart');
var productRouter = require('@/routes/product');
var orderRouter = require('@/routes/order');
var categoryRouter = require('@/routes/category');
var mongoose = require('mongoose');

dotenv.config();
const PORT = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI || "";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect(mongodbURI);

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
