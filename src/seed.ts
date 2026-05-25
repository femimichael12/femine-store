import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { products } from "./data";

async function seedDatabase() {
  console.log("Starting to seed database...");
  try {
    for (const product of products) {
      // Use the product's ID as the document ID in Firestore
      const docRef = doc(db, "products", product.id);
      await setDoc(docRef, product);
      console.log(`Successfully added product: ${product.name}`);
    }
    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
