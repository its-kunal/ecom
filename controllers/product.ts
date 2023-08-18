import productModel, { Product } from "../models/product";

export async function addProduct({ product }: { product: Product }) {
  try {
    await productModel.create(product);
  } catch (err) {
    throw new Error("Error creating product");
  }
}

export async function deleteProduct({ productId }: { productId: string }) {
  try {
    await productModel.findByIdAndDelete(productId);
  } catch (err) {
    throw new Error("Error deleting product");
  }
}

export async function updateProduct({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}) {
  try {
    await productModel.findByIdAndUpdate(productId, product);
  } catch (err) {
    throw new Error("Error updating product");
  }
}

export async function getProduct({ productId }: { productId: string }) {
  try {
    return await productModel.findById(productId);
  } catch (err) {
    throw new Error("Error getting product");
  }
}

export async function getProducts({
  query,
  categoryId,
  minPrice,
  maxPrice,
  availability,
}: {
  query: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
}) {
  let priceRange = {};
  if (minPrice != undefined) priceRange = { ...priceRange, $gte: minPrice };
  if (maxPrice != undefined) priceRange = { ...priceRange, $lte: maxPrice };

  let queryObj = {};
  queryObj = {
    ...queryObj,
    title: { $regex: query, $options: "i" },
    price: priceRange,
  };

  if (categoryId != undefined) queryObj = { ...queryObj, categoryId };
  if (availability != undefined) queryObj = { ...queryObj, availability };

  try {
    return await productModel.find(queryObj);
  } catch (err) {
    throw new Error("Error getting products");
  }
}
