import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

const mongoDbURI = process.env.MONGODB_URI!;

async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose;
    }
    return await mongoose.connect(mongoDbURI);
  } catch (error: any) {
    return Promise.reject(error);
  }
}

async function connectMongoDb(): Promise<MongoClient> {
  const client = new MongoClient(mongoDbURI);
  try {
    await client.connect();
    client.db("netflix-clone").command({ ping: 1 });
    return client;
  } catch (error: any) {
    await client.close();
    return Promise.reject(error);
  }
}
export { connectToDatabase, connectMongoDb };
