import categoryModel from "@/models/category";

export async function createCategory({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  try {
    const doc = await categoryModel.create({ name, description });
    return doc._id;
  } catch (err) {
    throw new Error("Error creating category");
  }
}

export async function getCategories() {
  try {
    return (await categoryModel.find({})).map((v) => {
      return { name: v.name, id: v._id };
    });
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
