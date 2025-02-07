// import { MongoClient } from "mongodb";

// const url = "mongodb://localhost:27017"; // Correct MongoDB URL
// const client = new MongoClient(url);

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB successfully!");
//     // Perform database operations here if needed
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//   } finally {
//     await client.close(); // Close the connection when done
//   }
// }

// connectDB();

import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "gymDB"; // Database name
const collectionName = "contacts"; // Collection name

async function saveContact(name, email, message) {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB!");

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the data
    const result = await collection.insertOne({ name, email, message, date: new Date() });
    console.log("Contact saved successfully:", result.insertedId);
  } catch (err) {
    console.error("Error saving contact:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Example usage
const name = "John Doe";
const email = "john.doe@example.com";
const message = "I am interested in joining the gym.";
saveContact(name, email, message);
