import mongoose from "mongoose";

const mongoDbURI = process.env.MONGODB_URI!;

async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose;
    }
    return await mongoose.connect(mongoDbURI);
  } catch (error: any) {
    console.log("error connectin to database", error);
    return Promise.reject(error);
  }
}

export { connectToDatabase };
