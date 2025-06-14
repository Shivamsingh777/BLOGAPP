import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    console.log("Connecting to MongoDB using:", process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

export default connectToMongoDB;









// import mongoose from "mongoose";


// const connectToMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("MongoDB connected successfully")
//     } catch (error) {
//         console.log("MongoDB connection error", error);
//     }
// }
// export default connectToMongoDB;
