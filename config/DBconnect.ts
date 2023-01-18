import mongoose from "mongoose";

const DB_URI = "mongodb://0.0.0.0:27017/authClass";

const dbConnection = async (): Promise<void> => {
  try {
    const con = await mongoose.connect(DB_URI);
    console.log(`db is connected to ${con.connection.host}`);
  } catch (error) {
    console.log(`unable to connect to database ${error}`);
  }
};

export default dbConnection;
