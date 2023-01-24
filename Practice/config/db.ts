import mongoose from "mongoose";

const URI = "mongodb://0.0.0.0:27017/authPractice";

const dbConfig = async (): Promise<void> => {
  try {
    const dbConnect = await mongoose.connect(URI);
    console.log(`db is connected to ${dbConnect.connection.host}`);
  } catch (error) {
    console.log(`failed to connect`);
  }
};

export default dbConfig;
