import categoryModel from "../models/category";

export async function createCategory({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  try {
    await categoryModel.create({ name, description });
  } catch (err) {
    throw new Error("Error creating category");
  }
}

export async function getCategories() {
  try {
    return (await categoryModel.find({}, { name: 1 })).map((v) => v.name);
  } catch (err) {
    throw new Error("Error getting categories");
  }
}

export async function getCategory({ categoryId }: { categoryId: string }) {
  try {
    return await categoryModel.findById(categoryId);
  } catch (err) {
    throw new Error("Error getting category");
  }
}
